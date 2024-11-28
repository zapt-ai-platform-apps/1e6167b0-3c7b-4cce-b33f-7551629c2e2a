import supabaseAdmin from './_supabaseAdminClient';
import * as Sentry from "@sentry/node";
import jwt from 'jsonwebtoken';

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

    let user = null;
    if (authorization) {
      const token = authorization.split(' ')[1];
      const SECRET = process.env.SUPABASE_JWT_SECRET;

      try {
        user = jwt.verify(token, SECRET);
      } catch (err) {
        console.error('Token verification failed:', err);
        Sentry.captureException(err);
      }
    }

    if (req.method === 'GET') {
      // Fetch posts
      const { data, error } = await supabaseAdmin
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        Sentry.captureException(error);
        return res.status(500).json({ error: 'حدث خطأ أثناء جلب المقالات.' });
      }

      return res.status(200).json({ posts: data });
    } else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
      // Ensure the user is authenticated and is the admin
      if (!user) {
        return res.status(401).json({ error: 'غير مصرح' });
      }

      if (user.email !== 'daoudi.abdennour@gmail.com') {
        return res.status(403).json({ error: 'ممنوع' });
      }

      if (req.method === 'POST') {
        const { title, description, content, category } = req.body;

        const { data, error } = await supabaseAdmin
          .from('posts')
          .insert([
            {
              title,
              description,
              content,
              category,
              created_at: new Date(),
            },
          ]);

        if (error) {
          console.error('Error creating post:', error);
          Sentry.captureException(error);
          return res.status(500).json({ error: 'حدث خطأ أثناء إنشاء المقال.' });
        }

        return res.status(200).json({ message: 'تم إنشاء المقال بنجاح.', post: data[0] });
      } else if (req.method === 'PUT') {
        const { id, title, description, content, category } = req.body;

        const { data, error } = await supabaseAdmin
          .from('posts')
          .update({
            title,
            description,
            content,
            category,
          })
          .eq('id', id);

        if (error) {
          console.error('Error updating post:', error);
          Sentry.captureException(error);
          return res.status(500).json({ error: 'حدث خطأ أثناء تحديث المقال.' });
        }

        return res.status(200).json({ message: 'تم تحديث المقال بنجاح.', post: data[0] });
      } else if (req.method === 'DELETE') {
        const { id } = req.body;

        const { error } = await supabaseAdmin
          .from('posts')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting post:', error);
          Sentry.captureException(error);
          return res.status(500).json({ error: 'حدث خطأ أثناء حذف المقال.' });
        }

        return res.status(200).json({ message: 'تم حذف المقال بنجاح.' });
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