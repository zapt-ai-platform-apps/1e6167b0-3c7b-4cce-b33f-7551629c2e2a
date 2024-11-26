import { createSignal, createEffect, Show, For } from 'solid-js';

function ArabicRadio() {
  const [countries, setCountries] = createSignal([]);
  const [stations, setStations] = createSignal([]);
  const [selectedCountry, setSelectedCountry] = createSignal('');
  const [selectedStation, setSelectedStation] = createSignal('');
  const [loadingStations, setLoadingStations] = createSignal(false);

  // بيانات تجريبية لأغراض العرض
  const radioData = {
    'مصر': [
      { name: 'راديو مصر', url: 'https://live.euradio.fr/mfm-aac' },
      { name: 'نجوم إف إم', url: 'http://live.nogoumfm.net:8000/nogoumfm' },
    ],
    'السعودية': [
      { name: 'راديو الرياض', url: 'http://live.almamlka.net:1935/live/ryadh.sdp/playlist.m3u8' },
      { name: 'إذاعة جدة', url: 'http://live.almamlka.net:1935/live/jedah.sdp/playlist.m3u8' },
    ],
    'لبنان': [
      { name: 'راديو لبنان', url: 'http://live.streamingfast.net/osmfm' },
      { name: 'صوت الغد', url: 'http://live.radiovose.com/voiceoflebanon' },
    ],
    // يمكن إضافة المزيد من البلدان والمحطات حسب الحاجة
  };

  createEffect(() => {
    // تعيين البلدان من مفاتيح radioData
    setCountries(Object.keys(radioData));
  });

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedStation('');
    if (country) {
      setLoadingStations(true);
      // محاكاة جلب المحطات
      setTimeout(() => {
        setStations(radioData[country]);
        setLoadingStations(false);
      }, 500);
    } else {
      setStations([]);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center flex-grow px-4">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">الراديو العربي</h2>
      <p class="text-lg mb-6 text-center">استمع إلى المحطات الإذاعية العربية المفضلة لديك من مختلف البلدان.</p>
      <div class="w-full max-w-md space-y-4">
        <div>
          <label for="country" class="block mb-2 text-gray-700 font-semibold">اختر البلد:</label>
          <select
            id="country"
            value={selectedCountry()}
            onInput={handleCountryChange}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
          >
            <option value="">اختر البلد</option>
            <For each={countries()}>
              {(country) => (
                <option value={country}>{country}</option>
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
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
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
          <div class="mt-4">
            <audio
              controls
              src={selectedStation()}
              class="w-full"
            />
          </div>
        </Show>
      </div>
    </div>
  );
}

export default ArabicRadio;