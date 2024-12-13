import { Show } from 'solid-js';

function GeneratedDescription(props) {
  return (
    <Show when={props.generatedDescription()}>
      <div class="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
        <h3 class="text-xl font-bold mb-2 text-purple-600">الوصف الناتج:</h3>
        <p class="text-gray-800">{props.generatedDescription()}</p>
      </div>
    </Show>
  );
}

export default GeneratedDescription;