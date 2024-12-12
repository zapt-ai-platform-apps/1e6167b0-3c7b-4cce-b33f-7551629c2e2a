import * as Sentry from "@sentry/node";
import { Configuration, OpenAIApi } from 'openai';
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
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Parse the request body
    const rawBody = await getRawBody(req);
    let body;
    try {
      body = JSON.parse(rawBody.toString('utf-8'));
    } catch (err) {
      res.status(400).json({ error: 'البيانات المرسلة غير صحيحة' });
      return;
    }

    const { prompt, size, n } = body;

    if (!prompt || !size || !n) {
      return res.status(400).json({ error: 'الطلب والوصف والحجم وعدد الصور مطلوب' });
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createImage({
      prompt: prompt,
      n: n,
      size: size,
      response_format: 'url',
    });

    const imageUrls = response.data.data.map(img => img.url);

    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error('Error generating image:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'حدث خطأ أثناء توليد الصورة' });
  }
}