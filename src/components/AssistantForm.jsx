import { Show } from 'solid-js';

function AssistantForm(props) {
  const {
    userText,
    setUserText,
    selectedOption,
    setSelectedOption,
    selectedLanguage,
    setSelectedLanguage,
    options,
    languages,
    handleExecute,
    loading,
  } = props;

  return (
    <div class="flex flex-col mb-8 space-y-4 w-full max-w-md">
      <textarea
        value={userText()}
        onInput={(e) => setUserText(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-40"
        placeholder="اكتب النص هنا..."
      ></textarea>
      <div class="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
        <select
          value={selectedOption()}
          onInput={(e) => setSelectedOption(e.target.value)}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer md:flex-1"
        >
          <option value="">اختر العملية</option>
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>

        <Show when={selectedOption() === 'ترجمة'}>
          <select
            value={selectedLanguage()}
            onInput={(e) => setSelectedLanguage(e.target.value)}
            class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer md:flex-1"
          >
            <option value="">اختر اللغة</option>
            {languages.map((language) => (
              <option value={language}>{language}</option>
            ))}
          </select>
        </Show>
      </div>
      <button
        class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-full transition duration-300 ease-in-out transform box-border ${
          loading() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:scale-105'
        }`}
        onClick={handleExecute}
        disabled={loading()}
      >
        <Show when={!loading()} fallback="جاري التنفيذ...">
          تنفيذ
        </Show>
      </button>
    </div>
  );
}

export default AssistantForm;