import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';
import InputField from './InputField';
import SelectField from './SelectField';

function SignUpForm(props) {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
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
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (props.loading()) return;
    props.setLoading(true);
    props.setMessage('');

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
        props.setMessage('حدث خطأ أثناء إنشاء الحساب.');
      } else {
        props.setMessage('تم إنشاء الحساب بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      props.setMessage('حدث خطأ أثناء إنشاء الحساب.');
    } finally {
      props.setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} class="space-y-4">
      <InputField
        label="الإسم الكامل"
        type="text"
        signal={[fullName, setFullName]}
        required={true}
      />
      <InputField
        label="اسم المستخدم"
        type="text"
        signal={[username, setUsername]}
        required={true}
      />
      <InputField
        label="البريد الإلكتروني"
        type="email"
        signal={[email, setEmail]}
        required={true}
      />
      <InputField
        label="كلمة المرور"
        type="password"
        signal={[password, setPassword]}
        required={true}
      />
      <SelectField
        label="الجنس"
        signal={[gender, setGender]}
        options={genders}
        placeholder="اختر الجنس"
        required={true}
      />
      <SelectField
        label="الدولة"
        signal={[country, setCountry]}
        options={countries}
        placeholder="اختر الدولة"
        required={true}
      />
      <button
        type="submit"
        class={`cursor-pointer w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out transform ${
          props.loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={props.loading()}
      >
        {props.loading() ? 'جاري المعالجة...' : 'إنشاء حساب'}
      </button>
    </form>
  );
}

export default SignUpForm;