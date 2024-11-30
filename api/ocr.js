import * as Sentry from "@sentry/node";
import { parse } from 'parse-multipart-data';
import fetch from 'node-fetch';
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

export default function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
    }

    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', async () => {
      body = Buffer.concat(body);

      // Parse the multipart form data
      const contentType = req.headers['content-type'];
      const boundaryMatch = contentType.match(/boundary=(.*)$/);
      if (!boundaryMatch) {
        return res.status(400).json({ error: 'يرجى تحميل صورة صحيحة' });
      }
      const boundary = boundaryMatch[1];

      const parts = parse(body, boundary);

      if (!parts.length) {
        return res.status(400).json({ error: 'يرجى تحميل صورة صحيحة' });
      }

      const filePart = parts.find(part => part.filename);

      if (!filePart) {
        return res.status(400).json({ error: 'يرجى تحميل صورة صحيحة' });
      }

      const fileBuffer = filePart.data;
      const filename = filePart.filename;
      const filetype = filePart.type;

      const language = 'unk'; // Use 'unk' for automatic language detection

      try {
        const formData = new FormData();
        formData.append('language', language);
        formData.append('apikey', process.env.OCRSPACE_API_KEY);
        formData.append('isOverlayRequired', 'false');
        formData.append('file', fileBuffer, {
          filename: filename,
          contentType: filetype
        });

        const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
          method: 'POST',
          body: formData,
          headers: formData.getHeaders(),
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