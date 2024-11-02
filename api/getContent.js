import { authenticateUser } from "./_apiUtils.js";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.PROJECT_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const user = await authenticateUser(req);

    // Fetch user-specific content or data
    const content = {
      message: `Welcome ${user.email}, this is your accessible content.`
    };

    res.status(200).json(content);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error fetching content' });
    }
  }
}