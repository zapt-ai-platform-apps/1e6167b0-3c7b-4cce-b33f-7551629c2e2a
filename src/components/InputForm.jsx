import { For, Show } from 'solid-js';

function InputForm(props) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    size,
    setSize,
    sizes,
    handleGenerateImage,
    loading,
  } = props;

  return (
    <div class="flex flex-col mb-8 space-y-4 w-full max-w-md">
      <input
        type="text"
        value={title()}
        onInput={(e) => setTitle(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        placeholder="عنوان الصورة (اختياري)"
      />
      <textarea
        value={description()}
        onInput={(e) => setDescription(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-32"
        placeholder="وصف تفصيلي للصورة..."
      ></textarea>
      <select
        value={size()}
        onInput={(e) => setSize(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
      >
        <option value="">اختر حجم الصورة</option>
        <For each={sizes}>{(item) => (
          <option value={item}>{item}</option>
        )}</For>
      </select>
      <button
        class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-full transition duration-300 ease-in-out transform box-border ${
          loading() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:scale-105'
        }`}
        onClick={handleGenerateImage}
        disabled={loading()}
      >
        <Show when={!loading()} fallback="جاري التوليد...">
          إنشاء
        </Show>
      </button>
    </div>
  );
}

export default InputForm;