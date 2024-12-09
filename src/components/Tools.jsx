import { createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import CategoriesSelect from './CategoriesSelect';
import ToolsList from './ToolsList';
import categories from '../data/categories';
import { handleToolClick } from '../utils/handleToolClick';

function Tools() {
  const [selectedCategory, setSelectedCategory] = createSignal('');
  const navigate = useNavigate();

  const currentCategory = () => {
    const categoryId = selectedCategory();
    if (categoryId) {
      return categories.find((category) => category.id === categoryId);
    } else {
      return null;
    }
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

      <CategoriesSelect
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Show when={currentCategory()}>
        <div class="mb-4 text-center">
          <p class="text-lg font-semibold text-primary-dark">{currentCategory().description}</p>
        </div>

        <ToolsList
          tools={currentCategory().tools}
          handleToolClick={handleToolClickFunction}
        />
      </Show>
    </main>
  );
}

export default Tools;