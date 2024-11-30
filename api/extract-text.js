import * as Sentry from "@sentry/node";
import FormData from 'form-data';
import fetch from 'node-fetch';

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

    const form = new FormData();

    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const contentType = req.headers['content-type'];
    if (!contentType.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'يرجى إرسال صورة باستخدام multipart/form-data' });
    }

    formHeaders = {};
    const formBoundary = contentType.split('boundary=')[1];
    formHeaders['content-type'] = `multipart/form-data; boundary=${formBoundary}`;
    
    form.append('image', buffer, {
      contentType: 'application/octet-stream',
      filename: 'image.jpg',
    });

    // إرسال الطلب إلى API OCR.space
    const apiKey = process.env.OCRSPACE_API_KEY;

    const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        apikey: apiKey,
        ...form.getHeaders(),
      },
      body: form,
    });

    const ocrResult = await ocrResponse.json();

    if (ocrResult.IsErroredOnProcessing) {
      return res.status(500).json({ error: 'حدث خطأ أثناء معالجة الصورة.' });
    }

    const extractedText = ocrResult.ParsedResults[0].ParsedText;

    return res.status(200).json({ text: extractedText });
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}