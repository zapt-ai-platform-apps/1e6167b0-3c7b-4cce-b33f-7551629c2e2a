import { createSignal, createEffect, Show, For } from 'solid-js';

function ArabicRadio() {
  const [countries] = createSignal([
    { name: 'الجزائر', code: 'DZ' },
    { name: 'البحرين', code: 'BH' },
    { name: 'جزر القمر', code: 'KM' },
    { name: 'جيبوتي', code: 'DJ' },
    { name: 'مصر', code: 'EG' },
    { name: 'العراق', code: 'IQ' },
    { name: 'الأردن', code: 'JO' },
    { name: 'الكويت', code: 'KW' },
    { name: 'لبنان', code: 'LB' },
    { name: 'ليبيا', code: 'LY' },
    { name: 'موريتانيا', code: 'MR' },
    { name: 'المغرب', code: 'MA' },
    { name: 'عمان', code: 'OM' },
    { name: 'فلسطين', code: 'PS' },
    { name: 'قطر', code: 'QA' },
    { name: 'المملكة العربية السعودية', code: 'SA' },
    { name: 'الصومال', code: 'SO' },
    { name: 'السودان', code: 'SD' },
    { name: 'سوريا', code: 'SY' },
    { name: 'تونس', code: 'TN' },
    { name: 'الإمارات العربية المتحدة', code: 'AE' },
    { name: 'اليمن', code: 'YE' },
  ]);
  const [stations, setStations] = createSignal([]);
  const [selectedCountry, setSelectedCountry] = createSignal('');
  const [selectedStation, setSelectedStation] = createSignal('');
  const [loadingStations, setLoadingStations] = createSignal(false);
  let audioRef;

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setSelectedStation('');
    setStations([]);
    if (countryCode) {
      setLoadingStations(true);
      fetchStations(countryCode);
    } else {
      setStations([]);
    }
  };

  const fetchStations = async (countryCode) => {
    try {
      const response = await fetch(`https://de1.api.radio-browser.info/json/stations/bycountrycodeexact/${countryCode}`);
      const data = await response.json();
      // Filter stations with valid stream URL
      const validStations = data.filter(station => station.url_resolved && station.name);
      // Map stations to desired format
      const formattedStations = validStations.map(station => ({
        name: station.name,
        url: station.url_resolved,
      }));
      setStations(formattedStations);
    } catch (error) {
      console.error('Error fetching stations:', error);
      alert('حدث خطأ أثناء جلب المحطات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoadingStations(false);
    }
  };

  createEffect(() => {
    if (selectedStation() && audioRef) {
      audioRef.src = selectedStation();
      audioRef.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  });

  const handleStop = () => {
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }
  };

  return (
    <div class="flex flex-col items-center justify-center h-full px-4">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">الراديو العربي</h2>
      <p class="text-lg mb-6 text-center">استمع إلى المحطات الإذاعية العربية المفضلة لديك من جميع البلدان العربية.</p>
      <div class="w-full max-w-md space-y-4">
        <div>
          <label for="country" class="block mb-2 text-gray-700 font-semibold">اختر البلد:</label>
          <select
            id="country"
            value={selectedCountry()}
            onInput={handleCountryChange}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer box-border"
          >
            <option value="">اختر البلد</option>
            <For each={countries()}>
              {(country) => (
                <option value={country.code}>{country.name}</option>
              )}
            </For>
          </select>
        </div>
        <Show when={selectedCountry()}>
          <div>
            <label for="station" class="block mb-2 text-gray-700 font-semibold">اختر المحطة:</label>
            <Show when={!loadingStations()} fallback={<p>جاري تحميل المحطات...</p>}>
              <select
                id="station"
                value={selectedStation()}
                onInput={(e) => setSelectedStation(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer box-border"
              >
                <option value="">اختر المحطة</option>
                <For each={stations()}>
                  {(station) => (
                    <option value={station.url}>{station.name}</option>
                  )}
                </For>
              </select>
            </Show>
          </div>
        </Show>
        <Show when={selectedStation()}>
          <div class="mt-4 flex items-center">
            <button
              class="cursor-pointer px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform box-border"
              onClick={handleStop}
            >
              إيقاف
            </button>
          </div>
          <audio
            ref={audioRef}
            src=""
            class="hidden"
          />
        </Show>
      </div>
    </div>
  );
}

export default ArabicRadio;