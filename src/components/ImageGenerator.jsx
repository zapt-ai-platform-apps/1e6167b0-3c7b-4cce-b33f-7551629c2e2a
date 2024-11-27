import { createSignal, Show, For } from 'solid-js';
import { createEvent } from '../supabaseClient';

function ImageGenerator() {
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [size, setSize] = createSignal('');
  const [format, setFormat] = createSignal('');
  const [generatedImage, setGeneratedImage] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const sizes = [
    '256x256',
    '512x512',
    '1024x1024',
  ];

  const formats = [
    'PNG',
    'JPEG',
    'WEBP',
  ];

  const handleGenerateImage = async () => {
    if (!description() || !size() || !format()) return;

    setLoading(true);
    setGeneratedImage('');

    const prompt = `${description()} Size: ${size()}, Format: ${format().toLowerCase()}`;

    try {
      const response = await createEvent('generate_image', {
        prompt: prompt,
      });

      if (response) {
        setGeneratedImage(response);
      } else {
        alert('حدث خطأ أثناء توليد الصورة.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('حدث خطأ أثناء توليد الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = generatedImage();
    link.download = title() ? `${title()}.${format().toLowerCase()}` : `image.${format().toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">منشئ الصور باستخدام الذكاء الاصطناعي</h2>
        <p class="text-lg text-center text-gray-700">أدخل وصفًا تفصيليًا للصورة واختر الحجم والصيغة لتوليد صورة مخصصة</p>
      </div>
      <div class="flex flex-col mb-4 space-y-4">
        <input
          type="text"
          value={title()}
          onInput={(e) => setTitle(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="عنوان الصورة (اختياري)"
        />
        <textarea
          value={description()}
          onInput={(e) => setDescription(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-32"
          placeholder="وصف تفصيلي للصورة..."
        ></textarea>
        <select
          value={size()}
          onInput={(e) => setSize(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
        >
          <option value="">اختر حجم الصورة</option>
          <For each={sizes}>{(item) => (
            <option value={item}>{item}</option>
          )}</For>
        </select>
        <select
          value={format()}
          onInput={(e) => setFormat(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
        >
          <option value="">اختر صيغة الصورة</option>
          <For each={formats}>{(item) => (
            <option value={item}>{item}</option>
          )}</For>
        </select>
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleGenerateImage}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري التوليد...">
            إنشاء
          </Show>
        </button>
      </div>
      <Show when={generatedImage()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">الصورة المُولدة:</h3>
          <img src={generatedImage()} alt="الصورة المولدة" class="w-full rounded-lg shadow-md mb-4" />
          <button
            class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform box-border"
            onClick={handleDownloadImage}
          >
            تحميل الصورة
          </button>
        </div>
      </Show>
    </div>
  );
}

export default ImageGenerator;