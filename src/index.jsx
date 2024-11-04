import { render } from 'solid-js/web';
import App from './App';
import './index.css';
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  integrations: [new BrowserTracing()],
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: import.meta.env.VITE_PUBLIC_APP_ID
    }
  }
});

// إضافة دعم PWA للتطبيق (Progressier)
window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512: "https://blindaccess.pw/assets/icon512.png",
  name: "Blind Accessibility",
  shortName: "Blind Access"
};
let script = document.createElement('script');
script.setAttribute('src', 'https://progressier.app/z8yY3IKmfpDIw3mSncPh/script.js');
script.setAttribute('defer', 'true');
document.querySelector('head').appendChild(script);

render(() => <App />, document.getElementById('root'));