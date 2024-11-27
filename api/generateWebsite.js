import * as Sentry from "@sentry/node";
import { Configuration, OpenAIApi } from "openai";
import archiver from "archiver";
import { pipeline } from 'stream';
import { promisify } from 'util';

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

    const { siteName, siteDescription, siteType, preferredColors } = req.body;

    if (!siteName || !siteDescription || !siteType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API Key');
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Generate the code for index.html
    const indexPrompt = `Generate the HTML code for the index.html file of a professional ${siteType} in Arabic named "${siteName}" with the following description: "${siteDescription}". Preferred colors: ${preferredColors || 'Default colors'}. Ensure the code is properly formatted and includes professional design elements.`;

    const cssPrompt = `Generate the CSS code for styles.css for the index.html you just generated, with styles matching the description and preferred colors.`;

    const jsPrompt = `If needed, generate the JavaScript code for script.js for interactivity in the website.`;

    const [indexResponse, cssResponse, jsResponse] = await Promise.all([
      openai.createCompletion({
        model: 'text-davinci-003',
        prompt: indexPrompt,
        max_tokens: 2000,
        temperature: 0,
      }),
      openai.createCompletion({
        model: 'text-davinci-003',
        prompt: cssPrompt,
        max_tokens: 1500,
        temperature: 0,
      }),
      openai.createCompletion({
        model: 'text-davinci-003',
        prompt: jsPrompt,
        max_tokens: 1000,
        temperature: 0,
      }),
    ]);

    const indexCode = indexResponse.data.choices[0].text.trim();
    const cssCode = cssResponse.data.choices[0].text.trim();
    const jsCode = jsResponse.data.choices[0].text.trim();

    // Create a zip file in memory
    const archive = archiver('zip', { zlib: { level: 9 } });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${siteName.replace(/\s+/g, '_') || 'website'}.zip`);

    archive.append(indexCode, { name: 'index.html' });
    if (cssCode && cssCode !== '') {
      archive.append(cssCode, { name: 'styles.css' });
    }
    if (jsCode && jsCode !== '') {
      archive.append(jsCode, { name: 'script.js' });
    }

    await archive.finalize();

    // Send the zip file to the client
    const asyncPipeline = promisify(pipeline);
    await asyncPipeline(archive, res);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error generating website:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}