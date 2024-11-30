import * as Sentry from "@sentry/node";
import formidable from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';  // <-- Added this line

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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
    }

    const form = formidable({ multiples: false });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        Sentry.captureException(err);
        return res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب' });
      }

      const image = files.image;
      if (!image) {
        return res.status(400).json({ error: 'يرجى تحميل صورة صحيحة' });
      }

      try {
        const formData = new FormData();
        formData.append('language', 'ara');
        formData.append('apikey', process.env.OCRSPACE_API_KEY);
        formData.append('file', fs.createReadStream(image.filepath));

        const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
          method: 'POST',
          headers: formData.getHeaders(),  // <-- Added this line
          body: formData,
        });

        const ocrResult = await ocrResponse.json();

        if (ocrResult.IsErroredOnProcessing) {
          console.error('OCR error:', ocrResult.ErrorMessage);
          Sentry.captureMessage('OCR error: ' + ocrResult.ErrorMessage);
          return res.status(500).json({ error: 'حدث خطأ أثناء استخراج النص' });
        }

        const extractedText = ocrResult.ParsedResults[0].ParsedText;

        return res.status(200).json({ text: extractedText });
      } catch (error) {
        console.error('Error during OCR processing:', error);
        Sentry.captureException(error);
        return res.status(500).json({ error: 'حدث خطأ أثناء استخراج النص' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}