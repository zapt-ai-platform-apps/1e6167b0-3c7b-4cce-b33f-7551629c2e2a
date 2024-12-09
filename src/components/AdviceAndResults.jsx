import { Show } from 'solid-js';

function AdviceAndResults(props) {
  const { age, zodiacSign, advice } = props;

  return (
    <>
      <Show when={age() !== null && zodiacSign()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">النتائج:</h3>
          <p class="text-gray-800 mb-2">عمرك: {age()} سنة</p>
          <p class="text-gray-800 mb-2">برجك: {zodiacSign()}</p>
        </div>
      </Show>
      <Show when={advice()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">نصائح وإرشادات:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white">
            <p class="whitespace-pre-wrap text-gray-800">{advice()}</p>
          </div>
        </div>
      </Show>
    </>
  );
}

export default AdviceAndResults;