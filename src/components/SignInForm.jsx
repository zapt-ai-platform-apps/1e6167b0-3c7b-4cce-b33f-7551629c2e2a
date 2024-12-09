import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';

function SignInForm(props) {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (props.loading()) return;
    props.setLoading(true);
    props.setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email(),
        password: password(),
      });

      if (error) {
        props.setMessage('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
      } else {
        props.navigate('/');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      props.setMessage('حدث خطأ أثناء تسجيل الدخول.');
    } finally {
      props.setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSignIn} class="space-y-4">
        <div>
          <label class="block text-neutral-dark font-semibold mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            class="box-border w-full p-3 border border-neutral DEFAULT rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            required
          />
        </div>
        <div>
          <label class="block text-neutral-dark font-semibold mb-2">كلمة المرور</label>
          <input
            type="password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            class="box-border w-full p-3 border border-neutral DEFAULT rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          class={`cursor-pointer w-full px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition duration-300 ease-in-out transform ${
            props.loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={props.loading()}
        >
          {props.loading() ? 'جاري المعالجة...' : 'تسجيل الدخول'}
        </button>
      </form>
      <button
        class={`cursor-pointer w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform mt-4 ${
          props.loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={props.handleGoogleSignIn}
        disabled={props.loading()}
      >
        {props.loading() ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول باستخدام حساب Google'}
      </button>
    </>
  );
}

export default SignInForm;