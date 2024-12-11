import { Show } from 'solid-js';
import { SolidMarkdown } from 'solid-markdown';

function AdviceAndResults(props) {
  const { age, zodiacSign, advice } = props;

  return (
    <>
      <Show when={age() !== null && zodiacSign()}>
        <div class="mt-4 p-6 bg-white rounded-lg shadow-md">
          <h3 class="text-2xl font-bold mb-4 text-purple-600">النتائج</h3>
          <p class="text-gray-800 mb-2"><span class="font-semibold">عمرك:</span> {age()} سنة</p>
          <p class="text-gray-800 mb-2"><span class="font-semibold">برجك:</span> {zodiacSign()}</p>
        </div>
      </Show>
      <Show when={advice()}>
        <div class="mt-6 p-6 bg-white rounded-lg shadow-md">
          <h3 class="text-2xl font-bold mb-4 text-purple-600">نصائح وإرشادات</h3>
          <SolidMarkdown class="prose text-gray-800 leading-relaxed" children={advice()} />
        </div>
      </Show>
    </>
  );
}

export default AdviceAndResults;