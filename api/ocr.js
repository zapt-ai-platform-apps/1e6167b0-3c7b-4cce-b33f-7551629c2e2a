import * as Sentry from "@sentry/node";
import fetch from 'node-fetch';
import FormData from 'form-data';
import multiparty from 'multiparty';
import fs from 'fs';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  tags: {
    type: 'backend',
    projectId: process.env.VITE_PUBLIC_APP_ID
  }
});

export default function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
    }

    const form = new multiparty.Form();

    form.parse(req, async function(err, fields, files) {
      try {
        if (err) {
          console.error('Error parsing form:', err);
          Sentry.captureException(err);
          return res.status(400).json({ error: 'يرجى تحميل صورة صحيحة' });
        }

        if (!files || !files.image || !files.image[0]) {
          return res.status(400).json({ error: 'يرجى تحميل صورة صحيحة' });
        }

        const file = files.image[0];
        const fileBuffer = fs.readFileSync(file.path);
        const filename = file.originalFilename || file.path;
        const filetype = file.headers['content-type'];

        const language = 'unk'; // Use 'unk' for automatic language detection

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

        if (!ocrResult.ParsedResults || !ocrResult.ParsedResults.length) {
          console.error('No ParsedResults from OCR API:', ocrResult);
          Sentry.captureMessage('No ParsedResults from OCR API');
          return res.status(500).json({ error: 'لم يتم استخراج أي نص من الصورة.' });
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