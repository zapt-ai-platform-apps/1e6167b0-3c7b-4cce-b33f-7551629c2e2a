import { For, Show } from 'solid-js';

function ServicesList(props) {
  const { services, handleServiceClick } = props;

  return (
    <Show
      when={services.length > 0}
      fallback={
        <p class="text-center text-gray-700">لا توجد خدمات متاحة حاليًا في هذه الفئة.</p>
      }
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <For each={services}>
          {(service) => (
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 class="text-xl font-bold mb-2 text-primary-dark">{service.name}</h3>
              <p class="text-gray-700 mb-4">{service.description}</p>
              <button
                class="cursor-pointer px-4 py-2 mt-2 bg-primary-dark text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleServiceClick(service)}
              >
                عرض الخدمة
              </button>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
}

export default ServicesList;