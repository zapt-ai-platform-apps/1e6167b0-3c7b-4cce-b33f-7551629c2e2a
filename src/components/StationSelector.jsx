import { Show, For } from 'solid-js';

function StationSelector(props) {
  return (
    <>
      <div>
        <label for="country" class="block mb-2 text-gray-700 font-semibold">اختر البلد:</label>
        <select
          id="country"
          value={props.selectedCountry()}
          onInput={props.handleCountryChange}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer box-border"
        >
          <option value="">اختر البلد</option>
          <For each={props.countries()}>
            {(country) => (
              <option value={country.code}>{country.name}</option>
            )}
          </For>
        </select>
      </div>
      <Show when={props.selectedCountry()}>
        <div>
          <label for="station" class="block mb-2 text-gray-700 font-semibold">اختر المحطة:</label>
          <Show when={!props.loadingStations()} fallback={<p>جاري تحميل المحطات...</p>}>
            <select
              id="station"
              value={props.selectedStation()}
              onInput={props.handleStationChange}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer box-border"
            >
              <option value="">اختر المحطة</option>
              <For each={props.stations()}>
                {(station) => (
                  <option value={station.url}>{station.name}</option>
                )}
              </For>
            </select>
          </Show>
        </div>
      </Show>
    </>
  );
}

export default StationSelector;