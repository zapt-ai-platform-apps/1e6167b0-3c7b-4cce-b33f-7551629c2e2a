import { render } from 'solid-js/web';
import App from './App';
import './index.css';
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";
import { Router } from '@solidjs/router';

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  integrations: [new BrowserTracing()],
  tags: {
    type: 'frontend',
    projectId: import.meta.env.VITE_PUBLIC_APP_ID
  }
});

// إضافة كود تتبع Umami
if (!window.location.hostname.includes('vercel.app')) {
  const umamiScript = document.createElement('script');
  umamiScript.defer = true;
  umamiScript.src = 'https://cloud.umami.is/script.js';
  umamiScript.setAttribute('data-website-id', import.meta.env.VITE_PUBLIC_UMAMI_WEBSITE_ID);
  document.head.appendChild(umamiScript);
}

// Add 'Made on ZAPT' badge
const addZaptBadge = () => {
  const badge = document.createElement('a');
  badge.href = 'https://www.zapt.ai';
  badge.target = '_blank';
  badge.rel = 'noopener noreferrer';
  badge.textContent = 'Made on ZAPT';
  badge.style.position = 'fixed';
  badge.style.bottom = '10px';
  badge.style.left = '10px';
  badge.style.backgroundColor = '#fff';
  badge.style.color = '#000';
  badge.style.padding = '5px 10px';
  badge.style.borderRadius = '5px';
  badge.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  badge.style.textDecoration = 'none';
  badge.style.zIndex = '1000';
  document.body.appendChild(badge);
};

window.addEventListener('DOMContentLoaded', addZaptBadge);

render(() => (
  <Router>
    <App />
  </Router>
), document.getElementById('root'));