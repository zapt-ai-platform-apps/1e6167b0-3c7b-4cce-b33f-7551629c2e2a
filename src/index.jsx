import { render } from 'solid-js/web';
import App from './App';
import './index.css';
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: import.meta.env.VITE_PUBLIC_APP_ID
    }
  }
});

// إزالة كود Progressier لمنع ظهور رسالة تثبيت التطبيق

// إضافة كود تتبع Umami
if (!window.location.hostname.includes('vercel.app')) {
  const umamiScript = document.createElement('script');
  umamiScript.defer = true;
  umamiScript.src = 'https://cloud.umami.is/script.js';
  umamiScript.setAttribute('data-website-id', import.meta.env.VITE_PUBLIC_UMAMI_WEBSITE_ID);
  document.head.appendChild(umamiScript);
}

render(() => <App />, document.getElementById('root'));