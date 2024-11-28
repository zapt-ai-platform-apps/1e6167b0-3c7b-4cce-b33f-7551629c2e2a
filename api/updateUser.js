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

    const { id, email, user_metadata } = req.body;

    // تحديث المستخدم
    const { data: updatedUser, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(id, {
      email,
      user_metadata,
    });

    if (updateError) {
      console.error('Error updating user:', updateError);
      Sentry.captureException(updateError);
      return res.status(500).json({ error: 'حدث خطأ أثناء تحديث المستخدم.' });
    }

    res.status(200).json({ message: 'تم تحديث المستخدم بنجاح.', user: updatedUser });
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}