import { createSignal, Show } from 'solid-js';
import { supabase } from '../supabaseClient';

function Account(props) {
  const [userData, setUserData] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [editing, setEditing] = createSignal(false);
  const [message, setMessage] = createSignal('');

  // Editable fields
  const [fullName, setFullName] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [phoneNumber, setPhoneNumber] = createSignal('');
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

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserData(user);
        setFullName(user.user_metadata.full_name || '');
        setUsername(user.user_metadata.username || '');
        setPhoneNumber(user.user_metadata.phone_number || '');
        setGender(user.user_metadata.gender || '');
        setCountry(user.user_metadata.country || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName(),
          username: username(),
          phone_number: phoneNumber(),
          gender: gender(),
          country: country(),
        },
      });

      if (error) {
        setMessage('حدث خطأ أثناء تحديث الحساب.');
      } else {
        setMessage('تم تحديث الحساب بنجاح.');
        setEditing(false);
        fetchUserData();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('حدث خطأ أثناء تحديث الحساب.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(props.user.email);
      if (error) {
        setMessage('حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور.');
      } else {
        setMessage('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور.');
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchUserData();
  });

  return (
    <main class="flex-grow px-4">
      <div class="max-w-md mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark text-center">إدارة حسابي</h2>
        <Show when={!editing()}>
          <div class="mb-4">
            <p class="text-gray-700 font-semibold">الإسم الكامل: {userData()?.user_metadata.full_name}</p>
            <p class="text-gray-700 font-semibold">اسم المستخدم: {userData()?.user_metadata.username}</p>
            <p class="text-gray-700 font-semibold">البريد الإلكتروني: {userData()?.email}</p>
            <p class="text-gray-700 font-semibold">رقم الهاتف: {userData()?.user_metadata.phone_number}</p>
            <p class="text-gray-700 font-semibold">الجنس: {userData()?.user_metadata.gender}</p>
            <p class="text-gray-700 font-semibold">الدولة: {userData()?.user_metadata.country}</p>
          </div>
          <button
            class="cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border w-full mb-4"
            onClick={() => setEditing(true)}
          >
            تعديل الملف الشخصي
          </button>
        </Show>
        <Show when={editing()}>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">الإسم الكامل</label>
              <input
                type="text"
                value={fullName()}
                onInput={(e) => setFullName(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">اسم المستخدم</label>
              <input
                type="text"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
              <input
                type="tel"
                value={phoneNumber()}
                onInput={(e) => setPhoneNumber(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">الجنس</label>
              <select
                value={gender()}
                onInput={(e) => setGender(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
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
              >
                <option value="">اختر الدولة</option>
                {countries.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <button
              class={`cursor-pointer px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border w-full ${
                loading() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleUpdateProfile}
              disabled={loading()}
            >
              {loading() ? 'جاري التحديث...' : 'حفظ التغييرات'}
            </button>
            <button
              class="cursor-pointer px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out transform box-border w-full"
              onClick={() => setEditing(false)}
            >
              إلغاء
            </button>
          </div>
        </Show>
        <button
          class={`cursor-pointer px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform box-border w-full mt-4 ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handlePasswordReset}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري الإرسال...">
            تغيير كلمة المرور
          </Show>
        </button>
        <Show when={message()}>
          <div class="mt-4 text-center text-green-600 font-semibold">
            {message()}
          </div>
        </Show>
      </div>
    </main>
  );
}

export default Account;