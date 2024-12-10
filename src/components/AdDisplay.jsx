import { Show } from 'solid-js';

function AdDisplay(props) {
  return (
    <Show when={props.ad()}>
      <div class="bg-yellow-100 border border-yellow-400 text-yellow-800 p-6 rounded-lg mb-8">
        <h3 class="text-2xl font-bold mb-2">{props.ad().title}</h3>
        <p class="text-lg mb-4">{props.ad().description}</p>
        <button
          class="cursor-pointer px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={props.onClick}
        >
          {props.ad().buttonText}
        </button>
      </div>
    </Show>
  );
}

export default AdDisplay;