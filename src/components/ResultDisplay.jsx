import { Show } from 'solid-js';
import { SolidMarkdown } from 'solid-markdown';

function ResultDisplay(props) {
  const { resultText } = props;

  return (
    <Show when={resultText()}>
      <div class="mt-4 p-6 bg-white rounded-lg shadow-md w-full max-w-2xl">
        <h3 class="text-2xl font-bold mb-4 text-purple-600">النتيجة:</h3>
        <SolidMarkdown class="prose text-gray-800 leading-relaxed" children={resultText()} />
      </div>
    </Show>
  );
}

export default ResultDisplay;