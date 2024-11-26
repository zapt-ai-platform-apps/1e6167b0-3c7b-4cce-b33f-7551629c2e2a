import { createSignal, For, Show } from 'solid-js';
import ChatAssistant from './ChatAssistant';

function Tools() {
  const [selectedCategory, setSelectedCategory] = createSignal('');
  const [showAssistant, setShowAssistant] = createSignal(false);

  const categories = [
    {
      name: 'أدوات مساعدة بالذكاء الاصطناعي',
      description: 'استفد من الذكاء الاصطناعي لتعزيز قدراتك وزيادة إنتاجيتك.',
      tools: [
        { name: 'المساعد الذكي', description: 'تفاعل مع المساعد الذكي للحصول على إجابات سريعة ومساعدة فورية.' },
        { name: 'مساعد الكتابة الذكي', description: 'احصل على اقتراحات لكتابة أفضل وأسرع.' },
        { name: 'تحليل البيانات الذكي', description: 'حلل بياناتك بذكاء للوصول إلى رؤى قيمة.' },
      ],
    },
    {
      name: 'أدوات ترفيهية',
      description: 'استمتع بوقتك مع مجموعة من الأدوات الترفيهية الممتعة.',
      tools: [
        { name: 'لعبة التفكير', description: 'اختبر قدراتك العقلية واستمتع.' },
        { name: 'مولد النكات', description: 'احصل على نكات عشوائية لترفيهك.' },
      ],
    },
    {
      name: 'أدوات منشئي المحتوى',
      description: 'ابتكر محتوى رائع باستخدام أدوات مصممة خصيصًا لمنشئي المحتوى.',
      tools: [
        { name: 'محرر الفيديو المتقدم', description: 'حرر فيديوهاتك بسهولة واحترافية.' },
        { name: 'مصمم الرسومات', description: 'أنشئ تصاميم جذابة لمحتواك.' },
      ],
    },
    {
      name: 'أدوات للمطورين',
      description: 'احصل على أدوات متقدمة تساعدك في تطوير مشاريعك البرمجية بكفاءة.',
      tools: [
        { name: 'بيئة تطوير متكاملة', description: 'بيئة متكاملة لتطوير التطبيقات بسهولة.' },
        { name: 'محلل الأكواد', description: 'أداة لتحليل وتحسين أكوادك البرمجية.' },
      ],
    },
  ];

  const handleToolClick = (toolName) => {
    if (toolName === 'المساعد الذكي') {
      setShowAssistant(true);
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

  const closeAssistant = () => {
    setShowAssistant(false);
  };

  return (
    <main class="h-full">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">أدواتنا</h2>
        <p class="text-lg mb-8">
          اختر فئة الأدوات التي تهمك واستمتع بمجموعة من الأدوات المصممة خصيصًا لك.
        </p>
      </div>

      <div class="mb-8 flex justify-center">
        <select
          value={selectedCategory()}
          onInput={(e) => setSelectedCategory(e.target.value)}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
        >
          <option value="">اختر الفئة</option>
          <For each={categories}>{(category) => (
            <option value={category.name}>{category.name}</option>
          )}</For>
        </select>
      </div>

      <Show when={currentCategory()}>
        <div class="mb-4 text-center">
          <p class="text-lg font-semibold text-purple-600">{currentCategory().description}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <For each={currentCategory().tools}>{(tool) => (
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-2 text-purple-600">{tool.name}</h3>
              <p class="text-gray-700 mb-4">{tool.description}</p>
              <button
                class="cursor-pointer px-4 py-2 mt-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border"
                onClick={() => handleToolClick(tool.name)}
              >
                فتح الأداة
              </button>
            </div>
          )}</For>
        </div>
      </Show>

      <Show when={showAssistant()}>
        <ChatAssistant onClose={closeAssistant} />
      </Show>
    </main>
  );
}

export default Tools;