import { For } from 'solid-js';

function CategoriesList(props) {
  const { categories, handleCategoryClick } = props;

  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <For each={categories}>{(category) => (
        <div
          class="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
          onClick={() => handleCategoryClick(category.id)}
        >
          <img
            src="PLACEHOLDER"
            alt={category.name}
            {...{'data-image-request': `Icon representing ${category.name}`}}
            class="w-16 h-16 mx-auto mb-4"
          />
          <h3 class="text-xl font-bold mb-2 text-primary-dark text-center">{category.name}</h3>
          <p class="text-gray-700 text-center">{category.description}</p>
        </div>
      )}</For>
    </div>
  );
}

export default CategoriesList;