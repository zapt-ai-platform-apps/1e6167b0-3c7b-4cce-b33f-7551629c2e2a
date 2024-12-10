import { createSignal, Show, For } from 'solid-js';
import appsData from '../data/appsData';
import AppList from './AppList';

function ImportantApps() {
  const [selectedCategory, setSelectedCategory] = createSignal('');
  const categories = Object.keys(appsData);

  return (
    <div class="flex flex-col flex-grow h-full px-4">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">أهم التطبيقات</h2>
        <p class="text-lg text-center text-gray-700">
          اختر فئة التطبيق لعرض التطبيقات المتاحة.
        </p>
      </div>
      <div class="flex flex-col items-center mb-8">
        <select
          value={selectedCategory()}
          onInput={(e) => setSelectedCategory(e.target.value)}
          class="box-border w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
        >
          <option value="">اختر فئة التطبيقات</option>
          <For each={categories}>
            {(category) => (
              <option value={category}>{category}</option>
            )}
          </For>
        </select>
      </div>
      <Show when={selectedCategory()}>
        <AppList apps={appsData[selectedCategory()]} />
      </Show>
    </div>
  );
}

export default ImportantApps;