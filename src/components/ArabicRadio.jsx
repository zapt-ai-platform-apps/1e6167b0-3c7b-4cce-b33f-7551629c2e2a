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
  const [selectedStationIndex, setSelectedStationIndex] = createSignal(-1);
  const [loadingStations, setLoadingStations] = createSignal(false);
  const [isPlaying, setIsPlaying] = createSignal(false);
  let audioRef;

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setSelectedStation('');
    setSelectedStationIndex(-1);
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
      audioRef.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  });

  const handleStationChange = (e) => {
    const stationUrl = e.target.value;
    const index = stations().findIndex(station => station.url === stationUrl);
    setSelectedStationIndex(index);
    setSelectedStation(stationUrl);
  };

  const handlePlayPause = () => {
    if (audioRef) {
      if (isPlaying()) {
        audioRef.pause();
        setIsPlaying(false);
      } else {
        audioRef.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    }
  };

  const handlePreviousStation = () => {
    if (stations().length > 0) {
      let newIndex = selectedStationIndex() - 1;
      if (newIndex < 0) {
        newIndex = stations().length - 1; // wrap around to last station
      }
      setSelectedStationIndex(newIndex);
      setSelectedStation(stations()[newIndex].url);
    }
  };

  const handleNextStation = () => {
    if (stations().length > 0) {
      let newIndex = selectedStationIndex() + 1;
      if (newIndex >= stations().length) {
        newIndex = 0; // wrap around to first station
      }
      setSelectedStationIndex(newIndex);
      setSelectedStation(stations()[newIndex].url);
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
                onInput={handleStationChange}
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
          <div class="mt-4 flex items-center justify-center space-x-4 space-x-reverse">
            <button
              class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform box-border"
              onClick={handlePreviousStation}
            >
              المحطة السابقة
            </button>
            <button
              class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform box-border"
              onClick={handlePlayPause}
            >
              {isPlaying() ? 'إيقاف مؤقت' : 'تشغيل'}
            </button>
            <button
              class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform box-border"
              onClick={handleNextStation}
            >
              المحطة التالية
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