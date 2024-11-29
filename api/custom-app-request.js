import supabaseAdmin from './_supabaseAdminClient';
import * as Sentry from "@sentry/node";

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
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
    }

    const { name, email, details } = req.body;

    if (!name || !email || !details) {
      return res.status(400).json({ error: 'جميع الحقول مطلوبة.' });
    }

    const { data, error } = await supabaseAdmin
      .from('custom_app_requests')
      .insert([
        {
          name,
          email,
          details,
          created_at: new Date(),
        },
      ]);

    if (error) {
      console.error('Error saving custom app request:', error);
      Sentry.captureException(error);
      return res.status(500).json({ error: 'حدث خطأ أثناء حفظ طلبك. يرجى المحاولة مرة أخرى.' });
    }

    return res.status(200).json({ message: 'تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.' });
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}