import { createSignal, Show, For } from 'solid-js';

function Services() {
  const [selectedCategory, setSelectedCategory] = createSignal('');
  
  const categories = [
    {
      name: 'خدمات مجانية',
      services: [
        { name: 'خدمة مجانية 1', description: 'وصف لخدمة مجانية 1.' },
        { name: 'خدمة مجانية 2', description: 'وصف لخدمة مجانية 2.' },
        // ... أضف المزيد من الخدمات المجانية حسب الحاجة
      ],
    },
    {
      name: 'خدمات الدعم',
      services: [
        { name: 'خدمة الدعم 1', description: 'وصف لخدمة الدعم 1.' },
        { name: 'خدمة الدعم 2', description: 'وصف لخدمة الدعم 2.' },
        // ... أضف المزيد من خدمات الدعم حسب الحاجة
      ],
    },
  ];

  const currentCategory = () => {
    const categoryName = selectedCategory();
    if (categoryName) {
      return categories.find(category => category.name === categoryName);
    } else {
      return null;
    }
  };

  return (
    <main class="h-full">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">خدماتنا</h2>
        <p class="text-lg mb-8">
          اكتشف مجموعة الخدمات التي نقدمها لتعزيز استقلاليتك وتسهيل حياتك اليومية.
        </p>
      </div>

      <div class="mb-8 flex justify-center">
        <select
          value={selectedCategory()}
          onInput={(e) => setSelectedCategory(e.target.value)}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
        >
          <option value="">اختر الفئة</option>
          <For each={categories}>
            {(category) => (
              <option value={category.name}>{category.name}</option>
            )}
          </For>
        </select>
      </div>

      <Show when={currentCategory()}>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <For each={currentCategory().services}>
            {(service) => (
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-bold mb-2 text-purple-600">{service.name}</h3>
                <p class="text-gray-700">
                  {service.description}
                </p>
              </div>
            )}
          </For>
        </div>
      </Show>
    </main>
  );
}

export default Services;