import { createSignal, Show } from 'solid-js';

function ImageTextExtractor() {
  const [selectedImage, setSelectedImage] = createSignal(null);
  const [extractedText, setExtractedText] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleExtractText = async () => {
    if (!selectedImage()) {
      alert('يرجى اختيار صورة أولاً.');
      return;
    }

    setLoading(true);
    setExtractedText('');

    try {
      const formData = new FormData();
      formData.append('image', selectedImage());

      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setExtractedText(result.text);
      } else {
        alert('حدث خطأ أثناء استخراج النص. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      alert('حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">استخراج النص من الصورة</h2>
        <p class="text-lg text-center text-gray-700">قم باختيار صورة واستخراج النصوص منها باستخدام الذكاء الاصطناعي</p>
      </div>
      <div class="flex flex-col items-center mb-4 space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleExtractText}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري استخراج النص...">
            استخراج النص
          </Show>
        </button>
      </div>
      <Show when={extractedText()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">النص المستخرج:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white">
            <p class="whitespace-pre-wrap text-gray-800">{extractedText()}</p>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default ImageTextExtractor;