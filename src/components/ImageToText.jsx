import { createSignal, Show } from 'solid-js';

function ImageToText() {
  const [selectedFile, setSelectedFile] = createSignal(null);
  const [extractedText, setExtractedText] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setExtractedText('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile()) {
      alert('يرجى اختيار صورة.');
      return;
    }
    setLoading(true);
    setExtractedText('');
    try {
      const formData = new FormData();
      formData.append('image', selectedFile());

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setExtractedText(result.text);
      } else {
        console.error('Error extracting text:', result.error);
        alert('حدث خطأ أثناء استخراج النص. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">أداة استخراج النص من الصور</h2>
        <p class="text-lg text-center text-gray-700">قم بتحميل صورة لاستخراج النص منها باستخدام الذكاء الاصطناعي</p>
      </div>
      <form onSubmit={handleSubmit} class="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          class="box-border p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
        />
        <button
          type="submit"
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري المعالجة...">
            استخراج النص
          </Show>
        </button>
      </form>
      <Show when={extractedText()}>
        <div class="mt-6">
          <h3 class="text-lg font-bold mb-2 text-purple-600">النص المستخرج:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white">
            <p class="whitespace-pre-wrap text-gray-800">{extractedText()}</p>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default ImageToText;