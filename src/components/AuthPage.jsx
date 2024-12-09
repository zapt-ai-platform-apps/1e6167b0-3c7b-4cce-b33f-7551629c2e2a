import { createSignal, Show } from 'solid-js';
import { supabase } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

function AuthPage() {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');

  const handleGoogleSignIn = async () => {
    if (loading()) return;
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        setMessage('حدث خطأ أثناء تسجيل الدخول باستخدام حساب Google.');
      } else {
        // User will be redirected to Google sign-in page
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setMessage('حدث خطأ أثناء تسجيل الدخول باستخدام حساب Google.');
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setShowSignUp(!showSignUp());
    setMessage('');
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-neutral-light">
      <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-primary-dark">
          {showSignUp() ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
        </h2>
        <p class="text-lg mb-8 text-center text-neutral-dark">
          انطلق نحو الاستقلالية مع تطبيق Blind Accessibility – انضم إلينا للحصول على تجربة سلسة وسهلة الوصول.
        </p>
        <Show when={showSignUp()} fallback={
          <SignInForm
            loading={loading}
            setLoading={setLoading}
            message={message}
            setMessage={setMessage}
            navigate={navigate}
            handleGoogleSignIn={handleGoogleSignIn}
          />
        }>
          <SignUpForm
            loading={loading}
            setLoading={setLoading}
            message={message}
            setMessage={setMessage}
          />
        </Show>
        <div class="mt-4 text-center">
          <button
            onClick={toggleForm}
            class="text-blue-500 hover:underline cursor-pointer focus:outline-none"
          >
            {showSignUp() ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'إنشاء حساب جديد'}
          </button>
        </div>
        <Show when={message()}>
          <div class="mt-4 text-center text-green-600 font-semibold">
            {message()}
          </div>
        </Show>
      </div>
    </div>
  );
}

export default AuthPage;