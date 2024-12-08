import { createSignal, createMemo } from 'solid-js';
import audioItems from '../data/audioItems';
import CategoryFilter from './CategoryFilter';
import AudioList from './AudioList';

function AudioLibrary() {
  const [audioItemsSignal] = createSignal(audioItems);
  const [selectedCategory, setSelectedCategory] = createSignal('');

  const categories = createMemo(() => {
    const cats = audioItemsSignal().map((item) => item.category);
    return Array.from(new Set(cats));
  });

  const filteredAudioItems = createMemo(() => {
    if (selectedCategory() === '') {
      return audioItemsSignal();
    }
    return audioItemsSignal().filter((item) => item.category === selectedCategory());
  });

  const [currentAudio, setCurrentAudio] = createSignal(null);
  const [isPlaying, setIsPlaying] = createSignal(false);
  let audioRef;

  const handlePlayPause = (audio) => {
    if (currentAudio() && currentAudio().audioUrl === audio.audioUrl && isPlaying()) {
      audioRef.pause();
      setIsPlaying(false);
    } else {
      if (audioRef) {
        audioRef.pause();
      }
      setCurrentAudio(audio);
      audioRef = new Audio(audio.audioUrl);
      audioRef.play().then(() => {
        setIsPlaying(true);
        audioRef.onended = () => {
          setIsPlaying(false);
        };
      }).catch((error) => {
        console.error('Error playing audio:', error);
        alert('حدث خطأ أثناء تشغيل الملف الصوتي.');
      });
    }
  };

  return (
    <div class="flex flex-col flex-grow px-4 min-h-screen">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">المكتبة الصوتية</h2>
        <p class="text-lg text-center text-gray-700">استمتع بمجموعة من الكتب الصوتية والمحاضرات والدروس القيمة</p>
      </div>
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <AudioList
        filteredAudioItems={filteredAudioItems}
        currentAudio={currentAudio}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
      />
    </div>
  );
}

export default AudioLibrary;