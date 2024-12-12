import { For } from 'solid-js';

function GeneratedImage(props) {
  return (
    <div class="mt-8">
      <h3 class="text-2xl font-bold text-center mb-4">{props.title()}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <For each={props.generatedImages()}>
          {(imageUrl) => (
            <div class="flex flex-col items-center">
              <img
                src={imageUrl}
                alt={props.title()}
                class="max-w-full h-auto mx-auto rounded-lg shadow-md"
              />
              <button
                type="button"
                class="cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
                onClick={() => props.handleDownloadImage(imageUrl)}
              >
                تحميل الصورة
              </button>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default GeneratedImage;