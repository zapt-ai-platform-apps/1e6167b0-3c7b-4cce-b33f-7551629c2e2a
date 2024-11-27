import * as Sentry from "@sentry/node";
import { Configuration, OpenAIApi } from "openai";
import archiver from "archiver";

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

    // Prepare the prompts for the chat model
    const indexPrompt = `Generate the HTML code for the index.html file of a professional ${siteType} in Arabic named "${siteName}" with the following description: "${siteDescription}". Preferred colors: ${preferredColors || 'Default colors'}. Ensure the code is properly formatted and includes professional design elements. Return only the code and nothing else.`;

    const cssPrompt = `Generate the CSS code for styles.css for the index.html you just generated, with styles matching the description and preferred colors. Return only the code and nothing else.`;

    const jsPrompt = `If needed, generate the JavaScript code for script.js for interactivity in the website. Return only the code and nothing else. If not needed, respond with an empty string.`;

    // Create chat messages for each prompt
    const indexMessages = [{ role: 'user', content: indexPrompt }];
    const cssMessages = [{ role: 'user', content: cssPrompt }];
    const jsMessages = [{ role: 'user', content: jsPrompt }];

    // Make the API calls
    const [indexResponse, cssResponse, jsResponse] = await Promise.all([
      openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: indexMessages,
        max_tokens: 1500,
        temperature: 0,
      }),
      openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: cssMessages,
        max_tokens: 1000,
        temperature: 0,
      }),
      openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: jsMessages,
        max_tokens: 500,
        temperature: 0,
      }),
    ]);

    const indexCode = indexResponse.data.choices[0].message.content.trim();
    const cssCode = cssResponse.data.choices[0].message.content.trim();
    const jsCode = jsResponse.data.choices[0].message.content.trim();

    // Remove code block markers if present
    const cleanIndexCode = indexCode.replace(/^```html\s*/, '').replace(/```$/, '');
    const cleanCssCode = cssCode.replace(/^```css\s*/, '').replace(/```$/, '');
    const cleanJsCode = jsCode.replace(/^```(javascript|js)\s*/, '').replace(/```$/, '');

    // Create a zip file in memory
    const archive = archiver('zip', { zlib: { level: 9 } });

    // Listen for 'error' event
    archive.on('error', function(err) {
      throw err;
    });

    // Pipe archive data to the response
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${siteName.replace(/\s+/g, '_') || 'website'}.zip`);

    archive.pipe(res);

    archive.append(cleanIndexCode, { name: 'index.html' });
    if (cleanCssCode && cleanCssCode !== '') {
      archive.append(cleanCssCode, { name: 'styles.css' });
    }
    if (cleanJsCode && cleanJsCode !== '') {
      archive.append(cleanJsCode, { name: 'script.js' });
    }

    await archive.finalize();

  } catch (error) {
    Sentry.captureException(error);
    console.error('Error generating website:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}