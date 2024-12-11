import supabaseAdmin from './_supabaseAdminClient';
import * as Sentry from "@sentry/node";
import authenticateUser from './utils/authenticate';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost
} from './utils/postsOperations';
import getRawBody from 'raw-body';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    const { authorization } = req.headers;

    const user = await authenticateUser(authorization);

    if (req.method === 'GET') {
      return await fetchPosts(req, res, supabaseAdmin);
    } else if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      if (!user) {
        return res.status(401).json({ error: 'غير مصرح' });
      }

      if (user.email !== 'daoudi.abdennour@gmail.com') {
        return res.status(403).json({ error: 'ممنوع' });
      }

      // Parse the request body
      const rawBody = await getRawBody(req);
      try {
        req.body = JSON.parse(rawBody.toString('utf-8'));
      } catch (err) {
        res.status(400).json({ error: 'البيانات المرسلة غير صحيحة' });
        return;
      }

      if (req.method === 'POST') {
        return await createPost(req, res, supabaseAdmin);
      } else if (req.method === 'PUT') {
        return await updatePost(req, res, supabaseAdmin);
      } else if (req.method === 'DELETE') {
        return await deletePost(req, res, supabaseAdmin);
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
    }
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}