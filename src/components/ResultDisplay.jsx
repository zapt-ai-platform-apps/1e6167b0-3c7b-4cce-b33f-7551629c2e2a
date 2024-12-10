import { Show } from 'solid-js';

function ResultDisplay(props) {
  const { resultText } = props;

  return (
    <Show when={resultText()}>
      <div class="mt-4 p-6 bg-white rounded-lg shadow-md w-full max-w-2xl">
        <h3 class="text-2xl font-bold mb-4 text-purple-600">النتيجة:</h3>
        <p class="whitespace-pre-wrap text-gray-800 leading-relaxed">{resultText()}</p>
      </div>
    </Show>
  );
}

export default ResultDisplay;