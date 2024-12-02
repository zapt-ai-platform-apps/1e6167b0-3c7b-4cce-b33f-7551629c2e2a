import * as Sentry from "@sentry/node";
import formidable from 'formidable';
import pdfParse from 'pdf-parse';
import { Configuration, OpenAIApi } from 'openai';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  tags: {
    type: 'backend',
    projectId: process.env.VITE_PUBLIC_APP_ID,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
    }

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        Sentry.captureException(err);
        return res.status(500).json({ error: 'خطأ في معالجة الملف. يرجى المحاولة مرة أخرى.' });
      }

      try {
        if (!files || !files.file) {
          console.error('No file uploaded.');
          return res.status(400).json({ error: 'يرجى تحميل ملف PDF.' });
        }

        const file = files.file;

        // Read the uploaded file as a buffer
        const data = await fs.promises.readFile(file.filepath);
        const pdfData = await pdfParse(data);
        let text = pdfData.text;

        if (!text) {
          console.error('PDF parsing failed: No text extracted.');
          return res.status(400).json({ error: 'تعذر استخراج النص من ملف PDF. يرجى التأكد من أن الملف صالح.' });
        }

        // Truncate text if it's too long
        const maxTokens = 2000; // adjust as needed
        if (text.length > maxTokens * 4) { // rough estimate since 1 token ~4 chars
          text = text.substring(0, maxTokens * 4);
        }

        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `يرجى تلخيص النص التالي باللغة العربية:\n\n${text}`,
          max_tokens: 500,
          temperature: 0.5,
        });

        const summary = completion.data.choices[0].text.trim();

        res.status(200).json({ summary });
      } catch (error) {
        console.error('Error processing PDF:', error);
        Sentry.captureException(error);
        res.status(500).json({ error: 'حدث خطأ أثناء معالجة الملف. يرجى المحاولة مرة أخرى.' });
      } finally {
        // Clean up the temporary file
        try {
          await fs.promises.unlink(file.filepath);
        } catch (err) {
          console.error('Error deleting temporary file:', err);
          Sentry.captureException(err);
        }
      }
    });
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}