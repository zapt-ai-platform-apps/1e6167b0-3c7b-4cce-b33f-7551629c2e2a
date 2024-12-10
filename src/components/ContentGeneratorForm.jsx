import { Show } from 'solid-js';

function ContentGeneratorForm(props) {
  return (
    <div class="flex flex-col mb-8 w-full max-w-md space-y-4">
      <input
        type="text"
        value={props.topic()}
        onInput={(e) => props.setTopic(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        placeholder="أدخل الموضوع..."
      />
      <select
        value={props.contentType()}
        onInput={(e) => props.setContentType(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
      >
        <option value="">اختر نوع المحتوى</option>
        {props.contentTypes.map((type) => (
          <option value={type}>{type}</option>
        ))}
      </select>
      <button
        class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-full transition duration-300 ease-in-out transform box-border ${
          props.loading() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:scale-105'
        }`}
        onClick={props.handleGenerateContent}
        disabled={props.loading()}
      >
        <Show when={!props.loading()} fallback={
          <div class="flex items-center justify-center">
            <span class="loader mr-2"></span>
            جاري التوليد...
          </div>
        }>
          إنشاء
        </Show>
      </button>
    </div>
  );
}

export default ContentGeneratorForm;