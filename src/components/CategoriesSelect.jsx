import { For } from 'solid-js';

function CategoriesSelect(props) {
  const { categories, selectedCategory, setSelectedCategory } = props;

  const handleSelectionChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
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
  );
}

export default CategoriesSelect;