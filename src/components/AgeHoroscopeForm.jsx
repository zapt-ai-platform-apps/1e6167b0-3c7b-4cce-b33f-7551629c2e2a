import { Show } from 'solid-js';

function AgeHoroscopeForm(props) {
  const { birthDate, setBirthDate, calculateAgeAndSign, loading } = props;

  return (
    <div class="flex flex-col mb-8 space-y-4 items-center w-full max-w-md">
      <input
        type="date"
        value={birthDate()}
        onInput={(e) => setBirthDate(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
      />
      <button
        class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-full transition duration-300 ease-in-out transform box-border ${
          loading() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:scale-105'
        }`}
        onClick={calculateAgeAndSign}
        disabled={loading()}
      >
        <Show when={!loading()} fallback="جاري الحساب...">
          احسب
        </Show>
      </button>
    </div>
  );
}

export default AgeHoroscopeForm;