import { createSignal, Show } from 'solid-js';
import { supabase } from '../supabaseClient';

function Account(props) {
  const [email, setEmail] = createSignal(props.user.email);
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');

  const handleUpdate = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.updateUser({
        email: email(),
      });
      if (error) {
        setMessage('حدث خطأ أثناء تحديث الحساب.');
      } else {
        setMessage('تم تحديث الحساب بنجاح.');
      }
    } catch (error) {
      console.error('Error updating account:', error);
      setMessage('حدث خطأ أثناء تحديث الحساب.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email());
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

  return (
    <main class="flex-grow px-4">
      <div class="max-w-md mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark text-center">إدارة حسابي</h2>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">البريد الإلكتروني:</label>
          <input
            type="email"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          />
        </div>
        <div class="flex space-x-4 space-x-reverse">
          <button
            class={`cursor-pointer px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleUpdate}
            disabled={loading()}
          >
            <Show when={!loading()} fallback="جاري التحديث...">
              حفظ التغييرات
            </Show>
          </button>
          <button
            class={`cursor-pointer px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePasswordReset}
            disabled={loading()}
          >
            <Show when={!loading()} fallback="جاري الإرسال...">
              تغيير كلمة المرور
            </Show>
          </button>
        </div>
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