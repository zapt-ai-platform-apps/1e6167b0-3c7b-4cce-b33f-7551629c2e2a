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

    const { rating, feedback } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'يرجى اختيار تقييم من 1 إلى 5 نجوم.' });
    }

    const { data, error } = await supabaseAdmin
      .from('app_ratings')
      .insert([
        {
          rating,
          feedback,
          created_at: new Date(),
        },
      ]);

    if (error) {
      console.error('Error saving app rating:', error);
      Sentry.captureException(error);
      return res.status(500).json({ error: 'حدث خطأ أثناء حفظ تقييمك. يرجى المحاولة مرة أخرى.' });
    }

    return res.status(200).json({ message: 'شكرًا لتقييمك! نقدر ملاحظاتك القيمة.' });
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}