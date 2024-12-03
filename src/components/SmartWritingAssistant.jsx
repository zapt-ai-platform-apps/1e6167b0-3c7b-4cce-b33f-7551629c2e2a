import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function SmartWritingAssistant() {
  const [userText, setUserText] = createSignal('');
  const [selectedOption, setSelectedOption] = createSignal('');
  const [selectedLanguage, setSelectedLanguage] = createSignal('');
  const [resultText, setResultText] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const options = [
    'تصحيح',
    'تلخيص',
    'تحسين',
    'تشكيل',
    'ترجمة',
  ];

  const languages = [
    'الإنجليزية',
    'الفرنسية',
    'الإسبانية',
    'الألمانية',
    'التركية',
    'الصينية',
    // يمكن إضافة المزيد من اللغات
  ];

  const handleExecute = async () => {
    if (!userText() || !selectedOption()) return;

    setLoading(true);
    setResultText('');
    let prompt = '';

    if (selectedOption() === 'تصحيح') {
      prompt = `من فضلك قم بتصحيح النص التالي بالعربية وقدم النسخة المصححة فقط: ${userText()}`;
    } else if (selectedOption() === 'تلخيص') {
      prompt = `من فضلك قم بتلخيص النص التالي بالعربية وقدم الملخص فقط: ${userText()}`;
    } else if (selectedOption() === 'تحسين') {
      prompt = `من فضلك قم بتحسين النص التالي بالعربية لتحسين الوضوح والأسلوب، وقدم النسخة المُحسَّنة فقط: ${userText()}`;
    } else if (selectedOption() === 'تشكيل') {
      prompt = `من فضلك قم بإضافة التشكيل الكامل للنص التالي وقدم النص المُشَكَّل بالكامل فقط: ${userText()}`;
    } else if (selectedOption() === 'ترجمة') {
      if (!selectedLanguage()) {
        alert('يرجى اختيار اللغة للترجمة.');
        setLoading(false);
        return;
      }
      const languageMap = {
        'الإنجليزية': 'English',
        'الفرنسية': 'French',
        'الإسبانية': 'Spanish',
        'الألمانية': 'German',
        'التركية': 'Turkish',
        'الصينية': 'Chinese',
        // إضافة المزيد حسب الحاجة
      };
      const targetLanguage = languageMap[selectedLanguage()];
      prompt = `Please translate the following text from Arabic to ${targetLanguage} and provide the translation only: ${userText()}`;
    }

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });

      setResultText(response);
    } catch (error) {
      console.error('Error executing request:', error);
      alert('حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-purple-600">مساعد الكتابة الذكي</h2>
      </div>
      <div class="flex flex-col mb-4">
        <textarea
          value={userText()}
          onInput={(e) => setUserText(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-40 mb-4"
          placeholder="اكتب النص هنا..."
        ></textarea>
        <div class="flex flex-col md:flex-row md:justify-between mb-4 space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
          <select
            value={selectedOption()}
            onInput={(e) => setSelectedOption(e.target.value)}
            class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer md:flex-1"
          >
            <option value="">اختر العملية</option>
            {options.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>

          <Show when={selectedOption() === 'ترجمة'}>
            <select
              value={selectedLanguage()}
              onInput={(e) => setSelectedLanguage(e.target.value)}
              class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer md:flex-1"
            >
              <option value="">اختر اللغة</option>
              {languages.map((language) => (
                <option value={language}>{language}</option>
              ))}
            </select>
          </Show>
        </div>
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg transition duration-300 ease-in-out transform box-border ${
            loading() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:scale-105'
          }`}
          onClick={handleExecute}
          disabled={loading()}
        >
          <Show when={!loading()} fallback={
            <div class="flex items-center justify-center">
              <span class="loader mr-2"></span>
              جاري التنفيذ...
            </div>
          }>
            تنفيذ
          </Show>
        </button>
      </div>
      <Show when={resultText()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">النتيجة:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white">
            <p class="whitespace-pre-wrap text-gray-800">{resultText()}</p>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default SmartWritingAssistant;