import { Show } from 'solid-js';

function WebsiteBuilderForm(props) {
  return (
    <div class="flex flex-col mb-4 space-y-4">
      <div>
        <label class="block text-gray-700 font-semibold mb-2">عنوان الموقع</label>
        <input
          type="text"
          value={props.siteTitle()}
          onInput={(e) => props.setSiteTitle(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="أدخل عنوان الموقع"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">وصف الموقع</label>
        <input
          type="text"
          value={props.siteDescription()}
          onInput={(e) => props.setSiteDescription(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="أدخل وصف الموقع"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">نوع الموقع</label>
        <select
          value={props.siteType()}
          onInput={(e) => props.setSiteType(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
        >
          <option value="">اختر نوع الموقع</option>
          {props.siteTypes.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">وصف تفصيلي للموقع</label>
        <textarea
          value={props.detailedDescription()}
          onInput={(e) => props.setDetailedDescription(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-32"
          placeholder="أدخل وصفًا تفصيليًا للموقع والعناصر التي ترغب في تضمينها"
        ></textarea>
      </div>
      <button
        class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border mt-4 ${
          props.loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={props.handleGenerateSite}
        disabled={props.loading()}
      >
        <Show when={!props.loading()} fallback="جاري التوليد...">
          إنشاء
        </Show>
      </button>
    </div>
  );
}

export default WebsiteBuilderForm;