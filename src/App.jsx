import { Show } from 'solid-js';
import { Routes, Route, Navigate, useLocation } from '@solidjs/router';
import Header from './components/Header';
import AnnouncementBanner from './components/AnnouncementBanner';
import MainContent from './components/MainContent';
import Services from './components/Services';
import Tools from './components/Tools';
import ToolPage from './components/ToolPage';
import SocialMediaLinks from './components/SocialMediaLinks';
import Footer from './components/Footer';
import Account from './components/Account';
import AuthPage from './components/AuthPage';
import FreeCourses from './components/FreeCourses';
import ShareApp from './components/ShareApp';
import ImportantApps from './components/ImportantApps';
import { useAuth } from './hooks/useAuth';

function App() {
  const user = useAuth();

  const location = useLocation();

  return (
    <div class="min-h-screen h-full flex flex-col" dir="rtl">
      <div class="flex-grow mx-auto w-full h-full">
        <Header user={user} navigate={location.navigate} />
        <Show when={location.pathname !== '/share' && location.pathname !== '/login'}>
          <AnnouncementBanner />
        </Show>
        <div class="px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/free-courses" element={<FreeCourses />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:toolName/*" element={<ToolPage user={user} />} />
            <Route path="/account" element={user() ? <Account /> : <Navigate href="/login" />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/share" element={<ShareApp user={user} />} />
            <Route path="/important-apps" element={<ImportantApps />} />
          </Routes>
          <SocialMediaLinks />
        </div>
        <Footer user={user} />
      </div>
    </div>
  );
}

export default App;