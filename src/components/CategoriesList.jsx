import { For } from 'solid-js';

function CategoriesList(props) {
  const { categories, handleCategoryClick, buttonText } = props;

  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <For each={categories}>{(category) => (
        <div
          class="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <img
            src="PLACEHOLDER"
            alt={category.name}
            {...{'data-image-request': `Icon representing ${category.name}`}}
            class="w-16 h-16 mx-auto mb-4"
          />
          <h3 class="text-xl font-bold mb-2 text-primary-dark text-center">{category.name}</h3>
          <p class="text-gray-700 text-center mb-4">{category.description}</p>
          <button
            class="cursor-pointer px-4 py-2 mt-2 bg-primary-dark text-white rounded-lg hover:scale-105 transition duration-300 ease-in-out"
            onClick={() => handleCategoryClick(category.id)}
          >
            {buttonText}
          </button>
        </div>
      )}</For>
    </div>
  );
}

export default CategoriesList;