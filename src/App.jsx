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
import EssentialApps from './components/EssentialApps';
import Books from './components/Books';
import { useAuth } from './hooks/useAuth';

function App() {
  const user = useAuth();

  const location = useLocation();

  return (
    <div class="h-full bg-gradient-to-br from-purple-200 to-gray-200 text-neutral-dark flex flex-col" dir="rtl">
      <div class="flex-grow mx-auto w-full px-4 sm:px-6 lg:px-8 h-full">
        <Show when={location.pathname !== '/share' && location.pathname !== '/login'}>
          <Header user={user} />
          <AnnouncementBanner />
        </Show>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/free-courses" element={<FreeCourses />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:toolName/*" element={<ToolPage />} />
          <Route path="/account" element={user() ? <Account /> : <Navigate href="/login" />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/share" element={<ShareApp />} />
          <Route path="/essential-apps" element={<EssentialApps />} />
          <Route path="/books" element={<Books />} />
        </Routes>
        <SocialMediaLinks />
      </div>
      <Footer user={user} />
    </div>
  );
}

export default App;