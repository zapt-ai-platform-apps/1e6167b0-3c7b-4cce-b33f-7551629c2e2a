import { createSignal, Show } from 'solid-js';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { supabase } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';

function AuthPage() {
  const [isSignIn, setIsSignIn] = createSignal(true);
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setMessage('حدث خطأ أثناء تسجيل الدخول باستخدام Google.');
    }
    setLoading(false);
  };

  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">
          {isSignIn() ? 'تسجيل الدخول' : 'إنشاء حساب'}
        </h2>
        <p class="text-center mb-4">
          <span class="font-bold">Sign in with ZAPT</span>
        </p>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer text-blue-500 hover:underline mb-6 block text-center"
        >
          تعرف على ZAPT
        </a>
        <Show when={message()}>
          <div class="mb-4 text-center text-red-600">{message()}</div>
        </Show>
        <Show when={isSignIn()}>
          <SignInForm
            loading={loading}
            setLoading={setLoading}
            setMessage={setMessage}
            navigate={navigate}
            handleGoogleSignIn={handleGoogleSignIn}
          />
        </Show>
        <Show when={!isSignIn()}>
          <SignUpForm
            loading={loading}
            setLoading={setLoading}
            setMessage={setMessage}
          />
        </Show>
        <div class="mt-4 text-center">
          <button
            class="cursor-pointer text-blue-500 hover:underline"
            onClick={() => setIsSignIn(!isSignIn())}
          >
            {isSignIn() ? 'إنشاء حساب جديد' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;