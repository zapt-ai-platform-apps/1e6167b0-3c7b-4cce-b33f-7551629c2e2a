import { createSignal, Show, For } from 'solid-js';

function EssentialApps() {
  const [selectedCategory, setSelectedCategory] = createSignal('');
  const categories = [
    { name: 'قارئات الشاشة', apps: [] },
    { name: 'أصوات تحويل النص لكلام', apps: [] },
    { name: 'تطبيقات مساعدة لتسهيل الوصول', apps: [] },
    { name: 'تطبيقاتنا', apps: [] },
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
          اطلع على قائمة الفئات للتطبيقات والأدوات التي قد تساعد المكفوفين وضعاف البصر في حياتهم اليومية.
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
        <div class="text-center">
          <p class="text-gray-700">لا توجد تطبيقات متاحة حاليًا في هذه الفئة.</p>
        </div>
      </Show>
    </main>
  );
}

export default EssentialApps;