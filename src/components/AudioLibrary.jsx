import { createSignal, For } from 'solid-js';

function AudioLibrary() {
  const [audioItems] = createSignal([
    {
      title: 'كتاب صوتي: البداية والنهاية',
      description: 'الجزء الأول من كتاب البداية والنهاية لابن كثير بصوت مميز.',
      audioUrl: 'https://example.com/audio1.mp3',
    },
    {
      title: 'محاضرة: أهمية التعليم',
      description: 'محاضرة قيمة حول أهمية التعليم في المجتمع.',
      audioUrl: 'https://example.com/audio2.mp3',
    },
    // يمكنك إضافة المزيد من الملفات الصوتية هنا
  ]);

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
      audioRef.play();
      setIsPlaying(true);
      audioRef.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">المكتبة الصوتية</h2>
        <p class="text-lg text-center text-gray-700">استمتع بمجموعة من الكتب الصوتية والمحاضرات القيمة</p>
      </div>
      <div class="flex flex-col space-y-4">
        <For each={audioItems()}>
          {(audio) => (
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 class="text-xl font-bold mb-2 text-primary-dark">{audio.title}</h3>
              <p class="text-gray-700 mb-4">{audio.description}</p>
              <button
                class={`cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border ${
                  currentAudio() && currentAudio().audioUrl === audio.audioUrl && isPlaying() ? 'bg-red-600 hover:bg-red-700' : ''
                }`}
                onClick={() => handlePlayPause(audio)}
              >
                {currentAudio() && currentAudio().audioUrl === audio.audioUrl && isPlaying() ? 'إيقاف' : 'تشغيل'}
              </button>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default AudioLibrary;