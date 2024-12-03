import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function ImageToText() {
  const [selectedFile, setSelectedFile] = createSignal(null);
  const [extractedText, setExtractedText] = createSignal('');
  const [processedText, setProcessedText] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setExtractedText('');
    setProcessedText('');
    setError('');
  };

  const handleExtractText = async () => {
    if (!selectedFile()) {
      alert('يرجى اختيار صورة أولاً.');
      return;
    }

    setLoading(true);
    setExtractedText('');
    setProcessedText('');
    setError('');

    const formData = new FormData();
    formData.append('language', 'ara');
    formData.append('isOverlayRequired', 'false');
    formData.append('file', selectedFile());

    try {
      // OCR processing
      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: {
          'apikey': import.meta.env.VITE_PUBLIC_OCRSPACE_API_KEY,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.IsErroredOnProcessing) {
        setError('حدث خطأ أثناء معالجة الصورة: ' + data.ErrorMessage[0]);
      } else if (data.ParsedResults && data.ParsedResults.length > 0) {
        const extracted = data.ParsedResults[0].ParsedText;
        setExtractedText(extracted);

        // AI processing
        const prompt = `قم بتصحيح النص العربي التالي، وتنسيقه بطريقة احترافية، مع إضافة علامات الترقيم والفقرات المناسبة، وتصحيح أي أخطاء، وقدم النص المنسق فقط:

النص:
${extracted}`;

        const aiResponse = await createEvent('chatgpt_request', {
          prompt: prompt,
          response_type: 'text',
        });

        setProcessedText(aiResponse);

      } else {
        setError('لم يتم العثور على نص في الصورة.');
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      setError('حدث خطأ أثناء استخراج النص. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">أداة استخراج النص من الصورة</h2>
        <p class="text-lg text-center text-gray-700">قم بتحميل صورة تحتوي على نص ليتم استخراج نص صحيح ومنسق احترافيًا باستخدام تقنية OCR والذكاء الاصطناعي</p>
      </div>
      <div class="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          class="mb-4"
        />
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleExtractText}
          disabled={loading()}
        >
          {loading() ? 'جاري الاستخراج...' : 'استخراج النص'}
        </button>
      </div>
      <Show when={error()}>
        <div class="mt-4 text-red-600 font-semibold">
          {error()}
        </div>
      </Show>
      <Show when={processedText()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">النص المُستخرج والمنسق:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white" dir="rtl">
            <p class="whitespace-pre-wrap text-gray-800" style={{ 'font-family': "'Noto Kufi Arabic', 'Tahoma', sans-serif" }}>{processedText()}</p>
          </div>
        </div>
      </Show>
      <Show when={!processedText() && extractedText()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">النص المُستخرج:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white" dir="rtl">
            <p class="whitespace-pre-wrap text-gray-800" style={{ 'font-family': "'Noto Kufi Arabic', 'Tahoma', sans-serif" }}>{extractedText()}</p>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default ImageToText;