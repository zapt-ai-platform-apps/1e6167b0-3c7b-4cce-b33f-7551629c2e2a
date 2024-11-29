import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { Routes, Route, Navigate, useLocation } from '@solidjs/router';
import { supabase } from './supabaseClient';
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
import CustomAppRequest from './components/CustomAppRequest';
import JoinTeam from './components/JoinTeam';
import RateApp from './components/RateApp';

function App() {
  const [user, setUser] = createSignal(null);

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  const location = useLocation();

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 text-neutral-dark flex flex-col" dir="rtl">
      <div class="flex-grow mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Show when={location.pathname !== '/share'}>
          <Header user={user} />
          <AnnouncementBanner />
        </Show>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/free-courses" element={<FreeCourses />} />
          <Route path="/services/custom-app-request" element={<CustomAppRequest />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:toolName/*" element={<ToolPage />} />
          <Route path="/account" element={
            user() ? <Account /> : <Navigate href="/login" />
          } />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/share" element={<ShareApp />} />
          <Route path="/join-team" element={<JoinTeam />} />
          <Route path="/rate-app" element={<RateApp />} />
        </Routes>
        <SocialMediaLinks />
      </div>
      <Footer user={user} />
    </div>
  );
}

export default App;