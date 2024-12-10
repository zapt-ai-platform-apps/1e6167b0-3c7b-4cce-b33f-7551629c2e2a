import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import zodiacSigns from '../utils/zodiacSigns';
import AdviceAndResults from './AdviceAndResults';
import AgeHoroscopeForm from './AgeHoroscopeForm';

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
    <div class="flex flex-col flex-grow h-full items-center px-4">
      <div class="flex flex-col items-center mb-8">
        <h2 class="text-3xl font-bold text-purple-600 mb-4">حاسبة العمر والأبراج</h2>
        <p class="text-lg text-center text-gray-700">
          أدخل تاريخ ميلادك لتعرف عمرك وبرجك وتحصل على نصائح وإرشادات وتوقعات
        </p>
      </div>
      <AgeHoroscopeForm
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        calculateAgeAndSign={calculateAgeAndSign}
        loading={loading}
      />
      <Show when={error()}>
        <div class="mt-4 text-red-600 font-semibold text-center">{error()}</div>
      </Show>
      <AdviceAndResults age={age} zodiacSign={zodiacSign} advice={advice} />
    </div>
  );
}

export default AgeHoroscopeCalculator;