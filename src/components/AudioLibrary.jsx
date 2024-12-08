import { createSignal, For } from 'solid-js';
import AudioItem from './AudioItem';
import audioItems from '../data/audioItems';

function AudioLibrary() {
  const [audioItemsSignal] = createSignal(audioItems);

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
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">المكتبة الصوتية</h2>
        <p class="text-lg text-center text-gray-700">استمتع بمجموعة من الكتب الصوتية والمحاضرات القيمة</p>
      </div>
      <div class="flex flex-col space-y-4">
        <For each={audioItemsSignal()}>
          {(audio) => (
            <AudioItem
              audio={audio}
              currentAudio={currentAudio}
              isPlaying={isPlaying}
              handlePlayPause={handlePlayPause}
            />
          )}
        </For>
      </div>
    </div>
  );
}

export default AudioLibrary;