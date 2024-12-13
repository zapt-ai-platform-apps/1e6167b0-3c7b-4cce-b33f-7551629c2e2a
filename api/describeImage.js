import * as Sentry from '@sentry/node';
import FormData from 'form-data';

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

    const form = new FormData();

    // استخراج الصورة من الطلب
    const buffers = [];
    req.on('data', (chunk) => {
      buffers.push(chunk);
    });

    req.on('end', async () => {
      const buffer = Buffer.concat(buffers);
      form.append('image', buffer, {
        contentType: req.headers['content-type'],
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
    });

    req.on('error', (error) => {
      console.error('Error in request:', error);
      Sentry.captureException(error);
      res.status(500).json({ error: 'خطأ في الطلب' });
    });
  } catch (error) {
    console.error('Error in describeImage handler:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}