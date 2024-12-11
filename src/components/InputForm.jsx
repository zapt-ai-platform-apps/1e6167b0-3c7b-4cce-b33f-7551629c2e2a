import { For } from 'solid-js';

function InputForm(props) {
  return (
    <form class="w-full max-w-md">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          العنوان
        </label>
        <input
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={props.title()}
          onInput={(e) => props.setTitle(e.target.value)}
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          الوصف
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={props.description()}
          onInput={(e) => props.setDescription(e.target.value)}
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          الحجم
        </label>
        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={props.size()}
          onChange={(e) => props.setSize(e.target.value)}
        >
          <For each={props.sizes}>
            {(sizeOption) => (
              <option value={sizeOption}>{sizeOption}</option>
            )}
          </For>
        </select>
      </div>
      <div class="flex items-center justify-between">
        <button
          type="button"
          class={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${props.loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={props.loading()}
          onClick={props.handleGenerateImage}
        >
          {props.loading() ? 'جارٍ التوليد...' : 'توليد الصورة'}
        </button>
      </div>
    </form>
  );
}

export default InputForm;