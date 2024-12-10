import { For, Show } from 'solid-js';

function AppsList(props) {
  const { apps } = props;

  return (
    <Show
      when={apps.length > 0}
      fallback={
        <div class="text-center">
          <p class="text-gray-700">لا توجد تطبيقات متاحة حاليًا في هذه الفئة.</p>
        </div>
      }
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <For each={apps}>
          {(app) => (
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 class="text-xl font-bold mb-2 text-primary-dark">{app.name}</h3>
              <p class="text-gray-700 mb-4">{app.description}</p>
              <a
                href={app.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border"
              >
                تحميل التطبيق
              </a>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
}

export default AppsList;