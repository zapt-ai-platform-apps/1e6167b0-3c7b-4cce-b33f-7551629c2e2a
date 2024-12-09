import { createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import CategoriesList from './CategoriesList';
import ServicesList from './ServicesList';
import servicesCategories from '../data/servicesCategories';

function Services() {
  const [selectedCategory, setSelectedCategory] = createSignal(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    const category = servicesCategories.find((cat) => cat.id === categoryId);
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleServiceClick = (service) => {
    if (service.link) {
      navigate(service.link);
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

      <Show when={!selectedCategory()}>
        <CategoriesList
          categories={servicesCategories}
          handleCategoryClick={handleCategoryClick}
          buttonText="عرض الخدمات"
        />
      </Show>

      <Show when={selectedCategory()}>
        <div class="mb-4 text-center">
          <button
            class="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border mb-4"
            onClick={handleBackToCategories}
          >
            الرجوع إلى الفئات
          </button>
          <h3 class="text-xl font-bold mb-2 text-primary-dark">{selectedCategory().name}</h3>
          <p class="text-lg mb-4">{selectedCategory().description}</p>
        </div>

        <Show
          when={selectedCategory().services.length > 0}
          fallback={
            <p class="text-center text-gray-700">
              لا توجد خدمات متاحة حاليًا في هذه الفئة.
            </p>
          }
        >
          <ServicesList
            services={selectedCategory().services}
            handleServiceClick={handleServiceClick}
          />
        </Show>
      </Show>
    </main>
  );
}

export default Services;