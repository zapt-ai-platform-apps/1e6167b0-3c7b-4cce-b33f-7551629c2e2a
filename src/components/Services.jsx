import { createSignal, Show, For } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import ServiceRequestForm from './ServiceRequestForm';

function Services() {
  const [selectedCategory, setSelectedCategory] = createSignal('');
  const [showRequestForm, setShowRequestForm] = createSignal(false);
  const [selectedService, setSelectedService] = createSignal(null);
  const navigate = useNavigate();

  const categories = [
    {
      name: 'خدمات مجانية',
      services: [
        {
          name: 'استشارات تقنية مجانية',
          description: 'نقدم استشارات تقنية لمساعدتك في اختيار الأجهزة والتطبيقات المناسبة.',
          link: null,
        },
        {
          name: 'دورات تدريبية مجانية',
          description: 'انضم لدوراتنا التدريبية المجانية لتحسين مهاراتك.',
          link: '/services/free-courses',
        },
      ],
    },
  ];

  const handleServiceClick = (service) => {
    if (service.link) {
      navigate(service.link);
    }
  };

  const handleRequestService = (service) => {
    setSelectedService(service);
    setShowRequestForm(true);
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
    <main class="flex-grow px-4">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">خدماتنا</h2>
        <p class="text-lg mb-8">
          اكتشف مجموعة الخدمات التي نقدمها لتعزيز استقلاليتك وتسهيل حياتك اليومية.
        </p>
      </div>

      <div class="mb-8 flex justify-center">
        <select
          value={selectedCategory()}
          onInput={handleSelectionChange}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
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
              <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 class="text-xl font-bold mb-2 text-primary-dark">{service.name}</h3>
                <p class="text-gray-700">
                  {service.description}
                </p>
                <Show when={service.link}>
                  <button
                    class="cursor-pointer px-4 py-2 mt-2 bg-primary-dark text-white rounded-lg hover:scale-105 transition duration-300 ease-in-out"
                    onClick={() => handleServiceClick(service)}
                  >
                    عرض الخدمة
                  </button>
                </Show>
                <Show when={!service.link}>
                  <button
                    class="cursor-pointer px-4 py-2 mt-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform"
                    onClick={() => handleRequestService(service)}
                  >
                    طلب الخدمة
                  </button>
                </Show>
              </div>
            )}
          </For>
        </div>
      </Show>

      <Show when={showRequestForm()}>
        <ServiceRequestForm
          service={selectedService()}
          onClose={() => setShowRequestForm(false)}
        />
      </Show>
    </main>
  );
}

export default Services;