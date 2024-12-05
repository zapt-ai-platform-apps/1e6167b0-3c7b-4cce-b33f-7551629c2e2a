import { createSignal, Show, For } from 'solid-js';

function EssentialApps() {
  const [selectedCategory, setSelectedCategory] = createSignal('');
  const categories = [
    { name: 'قارئات الشاشة', apps: ['NVDA', 'JAWS', 'VoiceOver', 'TalkBack'] },
    { name: 'أصوات تحويل النص لكلام', apps: ['Acapela TTS', 'IVONA', 'Google TTS'] },
    { name: 'تطبيقات مساعدة لتسهيل الوصول', apps: ['Be My Eyes', 'Microsoft Seeing AI', 'Aira'] },
    { name: 'تطبيقاتنا', apps: ['Blind Accessibility App'] },
  ];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const currentCategory = () => {
    return categories.find(category => category.name === selectedCategory());
  };

  return (
    <main class="flex-grow px-4 h-full">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">أهم التطبيقات التي يحتاجها كل كفيف</h2>
        <p class="text-lg mb-8">
          اطلع على قائمة بأهم التطبيقات والأدوات التي تساعد المكفوفين وضعاف البصر في حياتهم اليومية بشكل احترافي.
        </p>
      </div>

      <div class="mb-8 flex justify-center">
        <select
          value={selectedCategory()}
          onInput={handleCategoryChange}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
        >
          <option value="">اختر فئة التطبيقات</option>
          <For each={categories}>{(category) => (
            <option value={category.name}>{category.name}</option>
          )}</For>
        </select>
      </div>

      <Show when={currentCategory()}>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <For each={currentCategory().apps}>{(app) => (
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 class="text-xl font-bold mb-2 text-primary-dark">{app}</h3>
              <p class="text-gray-700">وصف مختصر عن {app} وفوائده.</p>
              {/* يمكن إضافة زر لتنزيل التطبيق أو زيارة موقعه */}
            </div>
          )}</For>
        </div>
      </Show>
    </main>
  );
}

export default EssentialApps;