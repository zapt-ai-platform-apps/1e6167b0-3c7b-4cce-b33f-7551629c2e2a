import { createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import CategoriesList from './CategoriesList';
import ToolsList from './ToolsList';
import categories from '../data/categories';
import { handleToolClick } from '../utils/handleToolClick';

function Tools() {
  const [selectedCategory, setSelectedCategory] = createSignal(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleToolClickFunction = (toolName) => {
    handleToolClick(toolName, navigate);
  };

  return (
    <main class="flex-grow px-4">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">أدواتنا</h2>
        <p class="text-lg mb-8">
          اختر فئة الأدوات التي تهمك واستمتع بمجموعة من الأدوات المصممة خصيصًا لك.
        </p>
      </div>

      <Show when={!selectedCategory()}>
        <CategoriesList
          categories={categories}
          handleCategoryClick={handleCategoryClick}
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

        <ToolsList
          tools={selectedCategory().tools}
          handleToolClick={handleToolClickFunction}
        />
      </Show>
    </main>
  );
}

export default Tools;