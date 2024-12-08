import { For } from 'solid-js';

function CategoryFilter(props) {
  return (
    <div class="mb-4">
      <label class="block text-gray-700 font-semibold mb-2">اختر الفئة:</label>
      <select
        value={props.selectedCategory()}
        onInput={(e) => props.setSelectedCategory(e.target.value)}
        class="cursor-pointer box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      >
        <option value="">كل الفئات</option>
        <For each={props.categories()}>
          {(category) => (
            <option value={category}>{category}</option>
          )}
        </For>
      </select>
    </div>
  );
}

export default CategoryFilter;