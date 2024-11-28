import { createSignal, onMount, Show } from 'solid-js';
import { supabase } from '../supabaseClient';

function Account(props) {
  const [userData, setUserData] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal('overview');
  const [message, setMessage] = createSignal('');

  // Editable fields
  const [fullName, setFullName] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [phoneNumber, setPhoneNumber] = createSignal('');
  const [gender, setGender] = createSignal('');
  const [country, setCountry] = createSignal('');

  // Password fields
  const [currentPassword, setCurrentPassword] = createSignal('');
  const [newPassword, setNewPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');

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
    if (loading()) return;
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
        fetchUserData();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('حدث خطأ أثناء تحديث الحساب.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (loading()) return;
    setLoading(true);
    setMessage('');
    if (newPassword() !== confirmPassword()) {
      setMessage('كلمتا المرور غير متطابقتين.');
      setLoading(false);
      return;
    }
    try {
      // Proceed to update password
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword(),
      });

      if (error) {
        if (error.message === 'New password should be different from the old password.') {
          setMessage('يجب أن تكون كلمة المرور الجديدة مختلفة عن كلمة المرور القديمة.');
        } else if (error.message === 'Password should be at least 6 characters') {
          setMessage('يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل.');
        } else {
          setMessage('حدث خطأ أثناء تغيير كلمة المرور.');
        }
      } else {
        setMessage('تم تغيير كلمة المرور بنجاح.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('حدث خطأ أثناء تغيير كلمة المرور.');
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchUserData();
  });

  return (
    <main class="flex-grow h-full px-4">
      <div class="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div class="bg-primary-dark text-white p-6">
          <h2 class="text-3xl font-bold mb-2 text-center">حسابي</h2>
          <p class="text-center text-base">مرحباً، {userData()?.user_metadata.full_name}!</p>
        </div>
        <div class="flex border-b border-gray-200">
          <button
            class={`cursor-pointer flex-1 text-center py-4 focus:outline-none ${
              activeTab() === 'overview' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
            }`}
            onClick={() => { setActiveTab('overview'); setMessage(''); }}
          >
            نظرة عامة
          </button>
          <button
            class={`cursor-pointer flex-1 text-center py-4 focus:outline-none ${
              activeTab() === 'edit-profile' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
            }`}
            onClick={() => { setActiveTab('edit-profile'); setMessage(''); }}
          >
            تعديل الملف الشخصي
          </button>
          <button
            class={`cursor-pointer flex-1 text-center py-4 focus:outline-none ${
              activeTab() === 'change-password' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
            }`}
            onClick={() => { setActiveTab('change-password'); setMessage(''); }}
          >
            تغيير كلمة المرور
          </button>
        </div>

        <div class="p-6">
          <Show when={activeTab() === 'overview'}>
            <div class="space-y-4">
              <div class="flex items-center">
                <span class="w-32 text-gray-700 font-semibold">الإسم الكامل:</span>
                <span class="text-gray-900">{userData()?.user_metadata.full_name}</span>
              </div>
              <div class="flex items-center">
                <span class="w-32 text-gray-700 font-semibold">اسم المستخدم:</span>
                <span class="text-gray-900">{userData()?.user_metadata.username}</span>
              </div>
              <div class="flex items-center">
                <span class="w-32 text-gray-700 font-semibold">البريد الإلكتروني:</span>
                <span class="text-gray-900">{userData()?.email}</span>
              </div>
              <div class="flex items-center">
                <span class="w-32 text-gray-700 font-semibold">رقم الهاتف:</span>
                <span class="text-gray-900">{userData()?.user_metadata.phone_number}</span>
              </div>
              <div class="flex items-center">
                <span class="w-32 text-gray-700 font-semibold">الجنس:</span>
                <span class="text-gray-900">{userData()?.user_metadata.gender}</span>
              </div>
              <div class="flex items-center">
                <span class="w-32 text-gray-700 font-semibold">الدولة:</span>
                <span class="text-gray-900">{userData()?.user_metadata.country}</span>
              </div>
            </div>
          </Show>

          <Show when={activeTab() === 'edit-profile'}>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 font-semibold mb-2">الإسم الكامل</label>
                <input
                  type="text"
                  value={fullName()}
                  onInput={(e) => setFullName(e.target.value)}
                  class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">اسم المستخدم</label>
                <input
                  type="text"
                  value={username()}
                  onInput={(e) => setUsername(e.target.value)}
                  class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={phoneNumber()}
                  onInput={(e) => setPhoneNumber(e.target.value)}
                  class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">الجنس</label>
                <select
                  value={gender()}
                  onInput={(e) => setGender(e.target.value)}
                  class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
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
                >
                  <option value="">اختر الدولة</option>
                  {countries.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <button
                class={`cursor-pointer px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform w-full ${
                  loading() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleUpdateProfile}
                disabled={loading()}
              >
                {loading() ? 'جاري التحديث...' : 'حفظ التغييرات'}
              </button>
            </div>
          </Show>

          <Show when={activeTab() === 'change-password'}>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 font-semibold mb-2">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={newPassword()}
                  onInput={(e) => setNewPassword(e.target.value)}
                  class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                  placeholder="أدخل كلمة المرور الجديدة"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">تأكيد كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={confirmPassword()}
                  onInput={(e) => setConfirmPassword(e.target.value)}
                  class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                  placeholder="أعد كتابة كلمة المرور الجديدة"
                />
              </div>
              <button
                class={`cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform w-full ${
                  loading() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handlePasswordChange}
                disabled={loading()}
              >
                {loading() ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
              </button>
            </div>
          </Show>

          <Show when={message()}>
            <div class="mt-4 text-center text-green-600 font-semibold">
              {message()}
            </div>
          </Show>
        </div>
      </div>
    </main>
  );
}

export default Account;