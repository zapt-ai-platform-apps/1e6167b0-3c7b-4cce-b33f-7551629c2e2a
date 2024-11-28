import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';

function AuthPage(props) {
  const [showSignUp, setShowSignUp] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');

  // Common fields
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  // Sign-up specific fields
  const [fullName, setFullName] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [phoneNumber, setPhoneNumber] = createSignal('');
  const [countryCode, setCountryCode] = createSignal('');
  const [gender, setGender] = createSignal('');
  const [country, setCountry] = createSignal('');

  const countryCodes = [
    { code: '+20', name: 'مصر' },
    { code: '+966', name: 'المملكة العربية السعودية' },
    { code: '+971', name: 'الإمارات العربية المتحدة' },
    { code: '+1', name: 'الولايات المتحدة الأمريكية' },
    // ... Add more country codes as needed
  ];

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
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email(),
        password: password(),
      }, {
        data: {
          full_name: fullName(),
          username: username(),
          phone_number: `${countryCode()}${phoneNumber()}`,
          gender: gender(),
          country: country(),
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
        props.setUser(data.user);
        props.setCurrentPage('homePage');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setMessage('حدث خطأ أثناء تسجيل الدخول.');
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
    setPhoneNumber('');
    setCountryCode('');
    setGender('');
    setCountry('');
  };

  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">
          {showSignUp() ? 'إنشاء حساب جديد' : 'تسجيل الدخول باستخدام ZAPT'}
        </h2>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline mb-6 block text-center"
        >
          تعرف على ZAPT
        </a>
        <form onSubmit={showSignUp() ? handleSignUp : handleSignIn} class="space-y-4">
          <Show when={showSignUp()}>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">الإسم الكامل</label>
              <input
                type="text"
                value={fullName()}
                onInput={(e) => setFullName(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">اسم المستخدم</label>
              <input
                type="text"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
                required
              />
            </div>
          </Show>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
              required
            />
          </div>
          <Show when={showSignUp()}>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
              <div class="flex">
                <select
                  value={countryCode()}
                  onInput={(e) => setCountryCode(e.target.value)}
                  class="p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
                >
                  <option value="">كود الدولة</option>
                  {countryCodes.map((item) => (
                    <option value={item.code}>{`${item.name} (${item.code})`}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phoneNumber()}
                  onInput={(e) => setPhoneNumber(e.target.value)}
                  class="flex-grow p-3 border-t border-r border-b border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
                  required
                />
              </div>
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">الجنس</label>
              <select
                value={gender()}
                onInput={(e) => setGender(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
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
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
                required
              >
                <option value="">اختر الدولة</option>
                {countries.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
          </Show>
          <button
            type="submit"
            class={`cursor-pointer w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading()}
          >
            {loading() ? 'جاري المعالجة...' : showSignUp() ? 'إنشاء حساب' : 'تسجيل الدخول'}
          </button>
        </form>
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