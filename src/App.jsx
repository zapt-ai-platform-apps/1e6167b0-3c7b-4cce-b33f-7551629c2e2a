import { createSignal, onMount, createEffect } from 'solid-js';
import { Router, Routes, Route, Navigate } from '@solidjs/router';
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

  return (
    <div class="min-h-screen h-full bg-white text-gray-900 flex flex-col" dir="rtl">
      <Router>
        <div class="mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow">
          <Header user={user()} isAdmin={isAdmin()} />
          <AnnouncementBanner />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:toolName" element={<ToolPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/account" element={
              user() ? <Account user={user()} /> : <Navigate href="/login" />
            } />
            <Route path="/admin" element={
              isAdmin() ? <AdminDashboard /> : <Navigate href="/" />
            } />
            <Route path="/login" element={<AuthPage />} />
          </Routes>
          <SocialMediaLinks />
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;