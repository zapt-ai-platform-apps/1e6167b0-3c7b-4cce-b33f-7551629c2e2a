import * as Sentry from "@sentry/node";
import fetch from 'node-fetch';
import FormData from 'form-data';
import formidable from 'formidable';
import fs from 'fs';

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

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
      return resolve();
    }

    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        Sentry.captureException(err);
        res.status(500).json({ error: 'حدث خطأ أثناء معالجة الصورة.' });
        return resolve();
      }

      try {
        const file = files.image;
        if (!file) {
          res.status(400).json({ error: 'يرجى إرسال صورة.' });
          return resolve();
        }

        // Create FormData to send to OCR.space
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.filepath), file.originalFilename);

        // إرسال الطلب إلى API OCR.space
        const apiKey = process.env.OCRSPACE_API_KEY;

        const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
          method: 'POST',
          headers: {
            apikey: apiKey,
          },
          body: formData,
        });

        const ocrResult = await ocrResponse.json();

        if (ocrResult.IsErroredOnProcessing) {
          res.status(500).json({ error: 'حدث خطأ أثناء معالجة الصورة.', details: ocrResult.ErrorMessage });
          return resolve();
        }

        const extractedText = ocrResult.ParsedResults[0].ParsedText;
        res.status(200).json({ text: extractedText });
        return resolve();

      } catch (error) {
        console.error('Error:', error);
        Sentry.captureException(error);
        res.status(500).json({ error: 'خطأ داخلي في الخادم' });
        return resolve();
      }
    });
  });
}