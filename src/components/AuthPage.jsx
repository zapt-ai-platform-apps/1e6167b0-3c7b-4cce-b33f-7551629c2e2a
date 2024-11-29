import { createSignal, Show } from 'solid-js';
import { supabase } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';

function AuthPage() {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');

  // Common fields
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  // Sign-up specific fields
  const [fullName, setFullName] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [gender, setGender] = createSignal('');
  const [country, setCountry] = createSignal('');

  const genders = ['ذكر', 'أنثى', 'آخر'];

  const countries = [
    'مصر',
    'المملكة العربية السعودية',
    'الإمارات العربية المتحدة',
    'الأردن',
    'فلسطين',
    // ... Add more countries as needed
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (loading()) return;
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email(),
        password: password(),
        options: {
          data: {
            full_name: fullName(),
            username: username(),
            gender: gender(),
            country: country(),
          },
        },
      });

      if (error) {
        setMessage('حدث خطأ أثناء إنشاء الحساب.');
      } else {
        setMessage('تم إنشاء الحساب بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setMessage('حدث خطأ أثناء إنشاء الحساب.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (loading()) return;
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email(),
        password: password(),
      });

      if (error) {
        setMessage('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setMessage('حدث خطأ أثناء تسجيل الدخول.');
    } finally {
      setLoading(false);
    }
  };

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
    // Reset fields
    setEmail('');
    setPassword('');
    setFullName('');
    setUsername('');
    setGender('');
    setCountry('');
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-neutral-light">
      <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-primary-dark">
          {showSignUp() ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
        </h2>
        <p class="text-lg mb-8 text-center text-gray-700">
          انطلق نحو الاستقلالية مع تطبيق Blind Accessibility – انضم إلينا للحصول على تجربة سلسة وسهلة الوصول.
        </p>
        <form onSubmit={showSignUp() ? handleSignUp : handleSignIn} class="space-y-4">
          <Show when={showSignUp()}>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">الإسم الكامل</label>
              <input
                type="text"
                value={fullName()}
                onInput={(e) => setFullName(e.target.value)}
                class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">اسم المستخدم</label>
              <input
                type="text"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">الجنس</label>
              <select
                value={gender()}
                onInput={(e) => setGender(e.target.value)}
                class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
                required
              >
                <option value="">اختر الجنس</option>
                {genders.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">الدولة</label>
              <select
                value={country()}
                onInput={(e) => setCountry(e.target.value)}
                class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
                required
              >
                <option value="">اختر الدولة</option>
                {countries.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
          </Show>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
              class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            class={`cursor-pointer w-full px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition duration-300 ease-in-out transform ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading()}
          >
            {loading() ? 'جاري المعالجة...' : (showSignUp() ? 'إنشاء حساب' : 'تسجيل الدخول')}
          </button>
        </form>
        <Show when={!showSignUp()}>
          <button
            class={`cursor-pointer w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform mt-4 ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleGoogleSignIn}
            disabled={loading()}
          >
            {loading() ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول باستخدام حساب Google'}
          </button>
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