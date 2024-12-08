import { createSignal, createEffect, Show } from 'solid-js';
import StationSelector from './StationSelector';
import PlayerControls from './PlayerControls';

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

  const handleCountryChange = async (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setSelectedStation('');
    setSelectedStationIndex(-1);
    setStations([]);
    if (countryCode) {
      setLoadingStations(true);
      await fetchStations(countryCode);
      setLoadingStations(false);
    } else {
      setStations([]);
    }
  };

  const fetchStations = async (countryCode) => {
    try {
      const response = await fetch(`https://de1.api.radio-browser.info/json/stations/bycountrycodeexact/${countryCode}`);
      const data = await response.json();
      const validStations = data.filter(station => station.url_resolved && station.name);
      const formattedStations = validStations.map(station => ({
        name: station.name,
        url: station.url_resolved,
      }));
      setStations(formattedStations);
    } catch (error) {
      console.error('Error fetching stations:', error);
      alert('حدث خطأ أثناء جلب المحطات. يرجى المحاولة مرة أخرى.');
    }
  };

  createEffect(() => {
    if (selectedStation() && audioRef) {
      audioRef.src = selectedStation();
      audioRef.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing audio:', error);
        alert('حدث خطأ أثناء تشغيل المحطة. يرجى اختيار محطة أخرى.');
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
          alert('حدث خطأ أثناء تشغيل المحطة. يرجى اختيار محطة أخرى.');
        });
      }
    }
  };

  const handlePreviousStation = () => {
    if (stations().length > 0) {
      let newIndex = selectedStationIndex() - 1;
      if (newIndex < 0) {
        newIndex = stations().length - 1;
      }
      setSelectedStationIndex(newIndex);
      setSelectedStation(stations()[newIndex].url);
    }
  };

  const handleNextStation = () => {
    if (stations().length > 0) {
      let newIndex = selectedStationIndex() + 1;
      if (newIndex >= stations().length) {
        newIndex = 0;
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
        <StationSelector
          countries={countries}
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
          stations={stations}
          selectedStation={selectedStation}
          handleStationChange={handleStationChange}
          loadingStations={loadingStations}
        />
        <Show when={selectedStation()}>
          <PlayerControls
            isPlaying={isPlaying}
            handlePlayPause={handlePlayPause}
            handlePreviousStation={handlePreviousStation}
            handleNextStation={handleNextStation}
            audioRef={(el) => { audioRef = el; }}
          />
        </Show>
      </div>
    </div>
  );
}

export default ArabicRadio;