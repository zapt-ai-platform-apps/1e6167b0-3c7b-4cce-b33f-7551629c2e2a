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
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Account from './components/Account';
import AdminDashboard from './components/AdminDashboard';
import AuthPage from './components/AuthPage';
import FreeCourses from './components/FreeCourses';
import ShareApp from './components/ShareApp';

function App() {
  const [user, setUser] = createSignal(null);
  const [isAdmin, setIsAdmin] = createSignal(false);

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setIsAdmin(user.email === 'daoudi.abdennour@gmail.com');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsAdmin(session.user.email === 'daoudi.abdennour@gmail.com');
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  const location = useLocation();

  return (
    <div class="h-full bg-white text-gray-900 flex flex-col" dir="rtl">
      <div class="mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow">
        <Show when={location.pathname !== '/share'}>
          <Header user={user} isAdmin={isAdmin} />
          <AnnouncementBanner />
        </Show>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/free-courses" element={<FreeCourses />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:toolName/*" element={<ToolPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/account" element={
            user() ? <Account /> : <Navigate href="/login" />
          } />
          <Route path="/admin" element={
            isAdmin() ? <AdminDashboard /> : <Navigate href="/" />
          } />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/share" element={<ShareApp />} />
        </Routes>
        <SocialMediaLinks />
      </div>
      <Footer />
    </div>
  );
}

export default App;