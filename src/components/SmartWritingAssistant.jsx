import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';
import AssistantForm from './AssistantForm';
import ResultDisplay from './ResultDisplay';

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
    <div class="flex flex-col flex-grow items-center px-4 h-full">
      <div class="flex flex-col items-center mb-8">
        <h2 class="text-3xl font-bold text-purple-600 mb-4">مساعد الكتابة الذكي</h2>
      </div>
      <AssistantForm
        userText={userText}
        setUserText={setUserText}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        options={options}
        languages={languages}
        handleExecute={handleExecute}
        loading={loading}
      />
      <ResultDisplay resultText={resultText} />
    </div>
  );
}

export default SmartWritingAssistant;