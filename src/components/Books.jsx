import { createSignal, Show, For } from 'solid-js';
import fetchBooks from '../api/fetchBooks';
import categories from '../data/categories';
import BookItem from './BookItem';

function Books() {
  const [selectedCategory, setSelectedCategory] = createSignal('');
  const [books, setBooks] = createSignal([]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchBooks(category, setBooks);
  };

  return (
    <main class="flex-grow px-4 h-full">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">كتب وقصص وروايات صوتية</h2>
        <p class="text-lg">
          اختر الفئة من القائمة أدناه لتصفح الكتب المتاحة.
        </p>
      </div>
      <div class="mb-8 flex justify-center">
        <select
          value={selectedCategory()}
          onInput={handleCategoryChange}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer box-border"
        >
          <option value="">اختر الفئة</option>
          <For each={categories}>{(category) => (
            <option value={category}>{category}</option>
          )}</For>
        </select>
      </div>
      <Show when={selectedCategory()}>
        <div>
          <h3 class="text-xl font-bold mb-4 text-primary-dark">{selectedCategory()}</h3>
          <Show
            when={books().length > 0}
            fallback={<p class="text-center text-gray-700">لا توجد كتب متاحة في هذه الفئة حالياً. يرجى التحقق لاحقاً.</p>}
          >
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <For each={books()}>{(book) => (
                <BookItem book={book} />
              )}</For>
            </div>
          </Show>
        </div>
      </Show>
    </main>
  );
}

export default Books;