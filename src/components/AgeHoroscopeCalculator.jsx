import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import zodiacSigns from '../utils/zodiacSigns';
import AdviceAndResults from './AdviceAndResults';

function AgeHoroscopeCalculator() {
  const [birthDate, setBirthDate] = createSignal('');
  const [age, setAge] = createSignal(null);
  const [zodiacSign, setZodiacSign] = createSignal('');
  const [advice, setAdvice] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');

  const calculateAgeAndSign = async () => {
    if (!birthDate()) {
      setError('يرجى إدخال تاريخ الميلاد.');
      return;
    }
    setLoading(true);
    setError('');
    setAge(null);
    setZodiacSign('');
    setAdvice('');

    try {
      const today = new Date();
      const birth = new Date(birthDate());
      let userAge = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        userAge--;
      }
      setAge(userAge);

      const birthMonthDay = birth.toISOString().slice(5, 10);
      const sign = zodiacSigns.find((z) => {
        if (z.startDate <= z.endDate) {
          return birthMonthDay >= z.startDate && birthMonthDay <= z.endDate;
        } else {
          // For signs that span over the year-end
          return birthMonthDay >= z.startDate || birthMonthDay <= z.endDate;
        }
      });
      setZodiacSign(sign.sign);

      const prompt = `أنا أريد نصائح وإرشادات وتوقعات لمواليد برج ${sign.sign} في هذا العام. يرجى تقديم نصائح ملهمة ومفيدة.`;
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });
      setAdvice(response);
    } catch (err) {
      console.error('Error:', err);
      setError('حدث خطأ أثناء حساب العمر والأبراج.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow h-full px-4">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">حاسبة العمر والأبراج</h2>
        <p class="text-lg text-center text-gray-700">
          أدخل تاريخ ميلادك لتعرف عمرك وبرجك وتحصل على نصائح وإرشادات وتوقعات
        </p>
      </div>
      <div class="flex flex-col mb-4 space-y-4 items-center">
        <input
          type="date"
          value={birthDate()}
          onInput={(e) => setBirthDate(e.target.value)}
          class="w-full max-w-sm p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={calculateAgeAndSign}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري الحساب...">
            احسب
          </Show>
        </button>
      </div>
      <Show when={error()}>
        <div class="mt-4 text-red-600 font-semibold text-center">{error()}</div>
      </Show>
      <AdviceAndResults age={age} zodiacSign={zodiacSign} advice={advice} />
    </div>
  );
}

export default AgeHoroscopeCalculator;