import * as Sentry from "@sentry/node";
import supabaseAdmin from './_supabaseAdminClient';
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
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
  }

  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'غير مصرح' });
    }

    const token = authorization.split(' ')[1];
    const SECRET = process.env.SUPABASE_JWT_SECRET;

    let user;

    try {
      user = jwt.verify(token, SECRET);
    } catch (err) {
      console.error('Token verification failed:', err);
      Sentry.captureException(err);
      return res.status(401).json({ error: 'فشل التحقق من الهوية' });
    }

    // التحقق من أن المستخدم هو المدير
    if (user.email !== 'daoudi.abdennour@gmail.com') {
      return res.status(403).json({ error: 'ممنوع' });
    }

    const { id } = req.body;

    // حذف المستخدم
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (deleteError) {
      console.error('Error deleting user:', deleteError);
      Sentry.captureException(deleteError);
      return res.status(500).json({ error: 'حدث خطأ أثناء حذف المستخدم.' });
    }

    res.status(200).json({ message: 'تم حذف المستخدم بنجاح.' });
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}