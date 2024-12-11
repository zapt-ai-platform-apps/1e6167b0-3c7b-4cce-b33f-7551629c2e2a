import jwt from 'jsonwebtoken';
import * as Sentry from "@sentry/node";

export default async function authenticateUser(authorization) {
  let user = null;
  if (authorization) {
    const token = authorization.split(' ')[1];
    const SECRET = process.env.SUPABASE_JWT_SECRET;

    try {
      user = jwt.verify(token, SECRET);
    } catch (err) {
      console.error('Token verification failed:', err);
      Sentry.captureException(err);
    }
  }
  return user;
}