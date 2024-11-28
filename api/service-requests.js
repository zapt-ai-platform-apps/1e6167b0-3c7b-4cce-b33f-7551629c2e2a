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

    if (!user) {
      return res.status(401).json({ error: 'غير مصرح' });
    }

    if (req.method === 'POST') {
      const { service_name, user_name, user_email, details } = req.body;

      const { error } = await supabaseAdmin
        .from('service_requests')
        .insert([
          {
            service_name,
            user_id: user.sub,
            user_email,
            user_name,
            details,
          },
        ]);

      if (error) {
        console.error('Error inserting service request:', error);
        Sentry.captureException(error);
        return res.status(500).json({ error: 'حدث خطأ أثناء إرسال الطلب.' });
      }

      return res.status(200).json({ message: 'تم إرسال طلبك بنجاح.' });

    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
    }
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}