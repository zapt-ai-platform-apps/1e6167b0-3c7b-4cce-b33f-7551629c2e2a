import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';

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
    // ... Add more countries as needed
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
      <div>
        <label class="block text-neutral-dark font-semibold mb-2">الإسم الكامل</label>
        <input
          type="text"
          value={fullName()}
          onInput={(e) => setFullName(e.target.value)}
          class="box-border w-full p-3 border border-neutral DEFAULT rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
          required
        />
      </div>
      <div>
        <label class="block text-neutral-dark font-semibold mb-2">اسم المستخدم</label>
        <input
          type="text"
          value={username()}
          onInput={(e) => setUsername(e.target.value)}
          class="box-border w-full p-3 border border-neutral DEFAULT rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
          required
        />
      </div>
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
      <div>
        <label class="block text-neutral-dark font-semibold mb-2">الجنس</label>
        <select
          value={gender()}
          onInput={(e) => setGender(e.target.value)}
          class="box-border w-full p-3 border border-neutral DEFAULT rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
          required
        >
          <option value="">اختر الجنس</option>
          {genders.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <label class="block text-neutral-dark font-semibold mb-2">الدولة</label>
        <select
          value={country()}
          onInput={(e) => setCountry(e.target.value)}
          class="box-border w-full p-3 border border-neutral DEFAULT rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
          required
        >
          <option value="">اختر الدولة</option>
          {countries.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        class={`cursor-pointer w-full px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition duration-300 ease-in-out transform ${
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