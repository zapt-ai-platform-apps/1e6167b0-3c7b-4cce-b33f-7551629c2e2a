import { createSignal, For, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function Tools() {
  const [selectedCategory, setSelectedCategory] = createSignal('');
  const navigate = useNavigate();

  const categories = [
    {
      name: 'أدوات مساعدة بالذكاء الاصطناعي',
      description: 'استفد من الذكاء الاصطناعي لتعزيز قدراتك وزيادة إنتاجيتك.',
      tools: [
        { name: 'المساعد الذكي', description: 'تفاعل مع المساعد الذكي للحصول على إجابات سريعة ومساعدة فورية.' },
        { name: 'مساعد الكتابة الذكي', description: 'أداة متقدمة تستخدم الذكاء الاصطناعي لمساعدتك على تحسين كتاباتك.' },
        { name: 'المساعد الصوتي الذكي', description: 'تفاعل صوتيًا مع المساعد للحصول على إجابات فورية.' },
      ],
    },
    {
      name: 'أدوات ترفيهية',
      description: 'اكتشف أدوات ترفيهية ممتعة ومبتكرة لتحسين تجربتك.',
      tools: [
        { name: 'الراديو العربي', description: 'استمع إلى المحطات الإذاعية العربية المفضلة لديك من مختلف البلدان.' },
      ],
    },
    {
      name: 'أدوات منشئي المحتوى',
      description: 'أدوات مخصصة لمساعدتك في إنشاء المحتوى بسهولة وكفاءة.',
      tools: [
        { name: 'منشئ المحتوى النصي', description: 'أنشئ جميع أنواع المحتوى النصي بمساعدة الذكاء الاصطناعي.' },
        { name: 'منشئ الصور بالذكاء الاصطناعي', description: 'أنشئ صورًا باستخدام الذكاء الاصطناعي بناءً على وصفك.' },
      ],
    },
    // يمكنك إضافة فئات أخرى إذا لزم الأمر
  ];

  const handleToolClick = (toolName) => {
    if (toolName === 'المساعد الذكي') {
      navigate('/tools/chat-assistant');
    } else if (toolName === 'مساعد الكتابة الذكي') {
      navigate('/tools/smart-writing-assistant');
    } else if (toolName === 'المساعد الصوتي الذكي') {
      navigate('/tools/smart-voice-assistant');
    } else if (toolName === 'الراديو العربي') {
      navigate('/tools/arabic-radio');
    } else if (toolName === 'منشئ المحتوى النصي') {
      navigate('/tools/article-generator');
    } else if (toolName === 'منشئ الصور بالذكاء الاصطناعي') {
      navigate('/tools/image-generator');
    } else {
      alert('هذه الأداة غير متوفرة حاليًا.');
    }
  };

  const currentCategory = () => {
    const categoryName = selectedCategory();
    if (categoryName) {
      return categories.find(category => category.name === categoryName);
    } else {
      return null;
    }
  };

  return (
    <main class="flex-grow px-4">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">أدواتنا</h2>
        <p class="text-lg mb-8">
          اختر فئة الأدوات التي تهمك واستمتع بمجموعة من الأدوات المصممة خصيصًا لك.
        </p>
      </div>

      <div class="mb-8 flex justify-center">
        <select
          value={selectedCategory()}
          onInput={(e) => setSelectedCategory(e.target.value)}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
        >
          <option value="">اختر الفئة</option>
          <For each={categories}>{(category) => (
            <option value={category.name}>{category.name}</option>
          )}</For>
        </select>
      </div>

      <Show when={currentCategory()}>
        <div class="mb-4 text-center">
          <p class="text-lg font-semibold text-primary-dark">{currentCategory().description}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <For each={currentCategory().tools}>{(tool) => (
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 class="text-xl font-bold mb-2 text-primary-dark">{tool.name}</h3>
              <p class="text-gray-700 mb-4">{tool.description}</p>
              <button
                class="cursor-pointer px-4 py-2 mt-2 bg-primary-dark text-white rounded-lg hover:scale-105 transition duration-300 ease-in-out"
                onClick={() => handleToolClick(tool.name)}
              >
                فتح الأداة
              </button>
            </div>
          )}</For>
        </div>
      </Show>
    </main>
  );
}

export default Tools;