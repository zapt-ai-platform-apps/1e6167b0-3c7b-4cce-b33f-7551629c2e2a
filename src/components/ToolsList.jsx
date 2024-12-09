import { For, Show } from 'solid-js';

function ToolsList(props) {
  const { tools, handleToolClick } = props;

  return (
    <Show
      when={tools.length > 0}
      fallback={
        <p class="text-center text-gray-700">لا توجد أدوات متاحة حاليًا في هذه الفئة.</p>
      }
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <For each={tools}>{(tool) => (
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <h3 class="text-xl font-bold mb-2 text-primary-dark">{tool.name}</h3>
            <p class="text-gray-700 mb-4">{tool.description}</p>
            <button
              class="cursor-pointer px-4 py-2 mt-2 bg-primary-dark text-white rounded-lg hover:scale-105 transition duration-300 ease-in-out"
              onClick={() => handleToolClick(tool.name)}
            >
              فتح الأداة
            </button>
          </div>
        )}</For>
      </div>
    </Show>
  );
}

export default ToolsList;