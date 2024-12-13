import * as Sentry from '@sentry/node';
import FormData from 'form-data';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID,
    },
  },
});

// Allow parsing of JSON bodies up to 10MB
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: `الطريقة ${req.method} غير مسموحة` });
    return;
  }

  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ error: 'غير مصرح' });
      return;
    }

    const token = authorization.split(' ')[1];
    // يمكنك التحقق من صحة التوكن هنا إذا لزم الأمر

    const { image } = req.body;

    if (!image) {
      res.status(400).json({ error: 'لم يتم توفير صورة' });
      return;
    }

    // Decode base64 image
    const buffer = Buffer.from(image, 'base64');

    const form = new FormData();
    form.append('image', buffer, {
      filename: 'image.jpg',
    });

    try {
      const response = await fetch('https://api.deepai.org/api/image-captioning', {
        method: 'POST',
        headers: {
          'Api-Key': process.env.DEEPAI_API_KEY,
          ...form.getHeaders(),
        },
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        res.status(response.status).json({ error: errorData.error || 'حدث خطأ أثناء معالجة الصورة' });
        return;
      }

      const data = await response.json();
      res.status(200).json({ description: data.output });
    } catch (error) {
      console.error('Error calling DeepAI API:', error);
      Sentry.captureException(error);
      res.status(500).json({ error: 'خطأ داخلي في الخادم' });
    }
  } catch (error) {
    console.error('Error in describeImage handler:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}