import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { Router, Routes, Route } from '@solidjs/router';
import { Auth } from '@supabase/auth-ui-solid';
import { supabase } from './supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Services from './components/Services';
import Tools from './components/Tools';
import ToolPage from './components/ToolPage';
import SocialMediaLinks from './components/SocialMediaLinks';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <div class="min-h-screen h-full bg-white text-gray-900 flex flex-col" dir="rtl">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">تسجيل الدخول مع ZAPT</h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                تعرف على المزيد حول ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                view="magic_link"
                showLinks={false}
                authView="magic_link"
              />
            </div>
          </div>
        }
      >
        <Router>
          <div class="mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow">
            <Header user={user()} onSignOut={handleSignOut} />
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/services" element={<Services />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/:toolName" element={<ToolPage />} />
            </Routes>
            <SocialMediaLinks />
          </div>
        </Router>
        <Footer user={user()} />
      </Show>
    </div>
  );
}

export default App;