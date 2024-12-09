import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';
import SignInFormFields from './SignInFormFields';

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
      <SignInFormFields
        handleSignIn={handleSignIn}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={props.loading}
        handleGoogleSignIn={props.handleGoogleSignIn}
      />
    </>
  );
}

export default SignInForm;