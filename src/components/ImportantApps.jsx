import { createSignal, Show } from 'solid-js';
import appsCategories from '../data/appsCategories';
import CategoriesList from './CategoriesList';
import AppList from './AppList';

function ImportantApps() {
  const [selectedCategory, setSelectedCategory] = createSignal(null);

  const handleCategoryClick = (categoryId) => {
    const category = appsCategories.find((cat) => cat.id === categoryId);
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div class="flex flex-col flex-grow h-full px-4">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">أهم التطبيقات</h2>
        <p class="text-lg text-center text-gray-700">
          اختر فئة التطبيق لعرض التطبيقات المتاحة.
        </p>
      </div>

      <Show when={!selectedCategory()}>
        <CategoriesList
          categories={appsCategories}
          handleCategoryClick={handleCategoryClick}
          buttonText="عرض التطبيقات"
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
          when={selectedCategory().apps.length > 0}
          fallback={
            <p class="text-center text-gray-700">
              لا توجد تطبيقات متاحة حاليًا في هذه الفئة.
            </p>
          }
        >
          <AppList apps={selectedCategory().apps} />
        </Show>
      </Show>
    </div>
  );
}

export default ImportantApps;