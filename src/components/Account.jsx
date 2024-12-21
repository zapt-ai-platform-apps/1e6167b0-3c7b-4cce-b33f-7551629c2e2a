import { createSignal, onMount, Show } from 'solid-js';
import { supabase } from '../supabaseClient';
import { OverviewTab, EditProfileTab, ChangePasswordTab } from './AccountTabs';

function Account(props) {
  const [userData, setUserData] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal('overview');
  const [message, setMessage] = createSignal('');

  // Editable fields
  const [fullName, setFullName] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [gender, setGender] = createSignal('');
  const [country, setCountry] = createSignal('');

  // Password fields
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
            <OverviewTab userData={userData} />
          </Show>

          <Show when={activeTab() === 'edit-profile'}>
            <EditProfileTab
              fullName={fullName}
              setFullName={setFullName}
              username={username}
              setUsername={setUsername}
              gender={gender}
              setGender={setGender}
              country={country}
              setCountry={setCountry}
              genders={genders}
              countries={countries}
              loading={loading}
              handleUpdateProfile={handleUpdateProfile}
            />
          </Show>

          <Show when={activeTab() === 'change-password'}>
            <ChangePasswordTab
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              loading={loading}
              handlePasswordChange={handlePasswordChange}
            />
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