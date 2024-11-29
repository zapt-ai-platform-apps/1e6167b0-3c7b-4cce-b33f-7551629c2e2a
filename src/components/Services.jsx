import { createSignal, For, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function Services() {
  const [selectedCategory, setSelectedCategory] = createSignal('');
  const navigate = useNavigate();

  const categories = [
    {
      name: 'خدمات مجانية',
      description: 'اكتشف مجموعة الخدمات المجانية التي نقدمها لتعزيز استقلاليتك وتسهيل حياتك اليومية.',
      services: [
        {
          name: 'دورات تدريبية مجانية',
          description: 'انضم لدوراتنا التدريبية المجانية لتحسين مهاراتك.',
          link: '/services/free-courses',
        },
      ],
    },
    {
      name: 'خدمات لأجلكم',
      description: 'اكتشف خدمات مصممة خصيصًا لتلبية احتياجاتك.',
      services: [
        {
          name: 'اطلب تطبيقك الخاص',
          description: 'صمم تطبيقًا مخصصًا يلبي احتياجاتك الخاصة.',
          link: '/services/custom-app-request',
        },
      ],
    },
  ];

  const handleServiceClick = (service) => {
    if (service.link) {
      navigate(service.link);
    }
  };

  const handleSelectionChange = (e) => {
    setSelectedCategory(e.target.value);
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
    <main class="flex-grow px-4 h-full">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">خدماتنا</h2>
        <p class="text-lg mb-8">
          اختر فئة الخدمات التي تهمك واستمتع بمجموعة من الخدمات المصممة خصيصًا لك.
        </p>
      </div>

      <div class="mb-8 flex justify-center">
        <select
          value={selectedCategory()}
          onInput={handleSelectionChange}
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

        <Show when={currentCategory().services.length > 0} fallback={
          <p class="text-center text-gray-700">لا توجد خدمات متاحة حاليًا في هذه الفئة.</p>
        }>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <For each={currentCategory().services}>{(service) => (
              <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <h3 class="text-xl font-bold mb-2 text-primary-dark">{service.name}</h3>
                <p class="text-gray-700 mb-4">
                  {service.description}
                </p>
                <button
                  class="cursor-pointer px-4 py-2 mt-2 bg-primary-dark text-white rounded-lg hover:scale-105 transition duration-300 ease-in-out"
                  onClick={() => handleServiceClick(service)}
                >
                  عرض الخدمة
                </button>
              </div>
            )}</For>
          </div>
        </Show>
      </Show>
    </main>
  );
}

export default Services;