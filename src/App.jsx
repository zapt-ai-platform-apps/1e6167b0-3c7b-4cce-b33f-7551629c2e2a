import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { Router, Routes, Route } from '@solidjs/router';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Header from './components/Header';
import AnnouncementBanner from './components/AnnouncementBanner';
import MainContent from './components/MainContent';
import Services from './components/Services';
import Tools from './components/Tools';
import ToolPage from './components/ToolPage';
import SocialMediaLinks from './components/SocialMediaLinks';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Store from './components/Store';
import Forum from './components/Forum';
import Account from './components/Account';

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

  return (
    <div class="min-h-screen h-full bg-white text-gray-900 flex flex-col" dir="rtl">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">تسجيل الدخول باستخدام ZAPT</h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                تعرف على ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                localization={{
                  variables: {
                    sign_up: {
                      email_label: 'البريد الإلكتروني',
                      password_label: 'كلمة المرور',
                      button_label: 'إنشاء حساب',
                      email_input_placeholder: 'أدخل بريدك الإلكتروني',
                      password_input_placeholder: 'أدخل كلمة المرور',
                      loading_button_label: 'جاري التحميل...',
                      social_provider_text: 'تسجيل الدخول باستخدام',
                      link_text: 'إنشاء حساب',
                      confirmation_message: 'تفقد بريدك الإلكتروني لتأكيد الحساب',
                    },
                    sign_in: {
                      email_label: 'البريد الإلكتروني',
                      password_label: 'كلمة المرور',
                      button_label: 'تسجيل الدخول',
                      email_input_placeholder: 'أدخل بريدك الإلكتروني',
                      password_input_placeholder: 'أدخل كلمة المرور',
                      loading_button_label: 'جاري التحميل...',
                      social_provider_text: 'تسجيل الدخول باستخدام',
                      link_text: 'تسجيل الدخول',
                    },
                    forgotten_password: {
                      link_text: 'نسيت كلمة المرور؟',
                      email_label: 'بريدك الإلكتروني',
                      password_label: 'كلمة المرور',
                      button_label: 'إعادة تعيين كلمة المرور',
                      confirmation_message: 'تفقد بريدك الإلكتروني لإعداد كلمة المرور الجديدة',
                    },
                    magic_link: {
                      email_input_label: 'بريدك الإلكتروني',
                      email_input_placeholder: 'أدخل بريدك الإلكتروني',
                      button_label: 'إرسال رابط تسجيل الدخول',
                      loading_button_label: 'جاري الإرسال...',
                      link_text: 'تسجيل الدخول باستخدام رابط سحري',
                      confirmation_message: 'تفقد بريدك الإلكتروني للحصول على رابط تسجيل الدخول',
                    },
                    verify_otp: {
                      email_input_label: 'بريدك الإلكتروني',
                      email_input_placeholder: 'أدخل بريدك الإلكتروني',
                      otp_input_label: 'رمز التحقق',
                      otp_input_placeholder: 'أدخل رمز التحقق',
                      button_label: 'التحقق',
                      loading_button_label: 'جاري التحقق...',
                      link_text: 'التحقق',
                      confirmation_message: 'تم التحقق بنجاح',
                    },
                  },
                }}
              />
            </div>
          </div>
        }
      >
        <Router>
          <div class="mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow">
            <Header user={user()} />
            <AnnouncementBanner />
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/services" element={<Services />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/:toolName" element={<ToolPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/store" element={<Store />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/account" element={<Account user={user()} />} />
            </Routes>
            <SocialMediaLinks />
          </div>
        </Router>
        <Footer />
      </Show>
    </div>
  );
}

export default App;