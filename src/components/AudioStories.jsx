import { createSignal, For, Show } from 'solid-js';

function AudioStories() {
  const stories = [
    { title: 'القصة الأولى', url: 'https://example.com/audio/story1.mp3' },
    { title: 'القصة الثانية', url: 'https://example.com/audio/story2.mp3' },
    // يمكن إضافة المزيد من القصص وتحديث عناوين الروابط
  ];

  const [currentStory, setCurrentStory] = createSignal(null);

  const playStory = (story) => {
    setCurrentStory(story);
  };

  return (
    <div class="flex flex-col items-center justify-center flex-grow">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">قصص مسموعة</h2>
      <div class="w-full max-w-md">
        <For each={stories}>{(story) => (
          <div class="mb-4 p-4 border border-gray-300 rounded-lg">
            <h3 class="text-lg font-bold mb-2 text-primary-dark">{story.title}</h3>
            <button
              class="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border"
              onClick={() => playStory(story)}
            >
              تشغيل القصة
            </button>
          </div>
        )}</For>
      </div>
      <Show when={currentStory()}>
        <div class="mt-8 w-full max-w-md">
          <h3 class="text-lg font-bold mb-2 text-primary-dark">الاستماع إلى: {currentStory().title}</h3>
          <audio controls src={currentStory().url} class="w-full">
            المتصفح الخاص بك لا يدعم تشغيل الصوت.
          </audio>
        </div>
      </Show>
    </div>
  );
}

export default AudioStories;