import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import TextDisplay from './TextDisplay';

function PDFReader() {
  const [selectedFile, setSelectedFile] = createSignal(null);
  const [extractedText, setExtractedText] = createSignal('');
  const [processedText, setProcessedText] = createSignal('');
  const [loadingOCR, setLoadingOCR] = createSignal(false);
  const [loadingAI, setLoadingAI] = createSignal(false);
  const [loadingTTS, setLoadingTTS] = createSignal(false);
  const [error, setError] = createSignal('');
  const [audioUrl, setAudioUrl] = createSignal('');

  let fileInputRef;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setExtractedText('');
    setProcessedText('');
    setAudioUrl('');
    setError('');
  };

  const handleExtractText = async () => {
    if (!selectedFile()) {
      alert('يرجى اختيار ملف PDF أولاً.');
      return;
    }

    setLoadingOCR(true);
    setExtractedText('');
    setProcessedText('');
    setAudioUrl('');
    setError('');

    const formData = new FormData();
    formData.append('language', 'ara');
    formData.append('isOverlayRequired', 'false');
    formData.append('isSearchablePdfHideTextLayer', 'true');
    formData.append('file', selectedFile());

    try {
      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: {
          'apikey': import.meta.env.VITE_PUBLIC_OCRSPACE_API_KEY,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.IsErroredOnProcessing) {
        setError('حدث خطأ أثناء معالجة الملف: ' + data.ErrorMessage[0]);
      } else if (data.ParsedResults && data.ParsedResults.length > 0) {
        const extracted = data.ParsedResults.map(result => result.ParsedText).join('\n');
        setExtractedText(extracted);

        setLoadingAI(true);
        const prompt = `قم بتصحيح النص العربي التالي، وتنسيقه بطريقة احترافية، مع إضافة علامات الترقيم والفقرات المناسبة، وتصحيح أي أخطاء، وقدم النص المنسق فقط:

النص:
${extracted}`;

        const aiResponse = await createEvent('chatgpt_request', {
          prompt: prompt,
          response_type: 'text',
        });

        setProcessedText(aiResponse);

      } else {
        setError('لم يتم العثور على نص في الملف.');
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      setError('حدث خطأ أثناء استخراج النص. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoadingOCR(false);
      setLoadingAI(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setExtractedText('');
    setProcessedText('');
    setAudioUrl('');
    setError('');
    if (fileInputRef) {
      fileInputRef.value = '';
    }
  };

  return (
    <div class="flex flex-col flex-grow h-full px-4">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">قارئ PDF الاحترافي</h2>
        <p class="text-lg text-center text-gray-700">قم بتحميل ملف PDF ليتم استخراج نص صحيح ومنسق احترافيًا باستخدام تقنية OCR والذكاء الاصطناعي</p>
      </div>
      <div class="flex flex-col items-center">
        <label class="cursor-pointer flex flex-col items-center bg-white rounded-lg border border-gray-300 p-4 mb-4 hover:bg-gray-100 transition">
          <svg
            class="w-8 h-8 mb-2 text-gray-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.94l-5-5a.75.75 0 10-1.06 1.06L14.44 9H9a7 7 0 00-.2 13.94 7 7 0 007-7v-5.44l3.06 3.06a.75.75 0 001.06-1.06l-5-5z" />
          </svg>
          <span class="text-gray-700">انقر هنا لاختيار ملف PDF</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            class="hidden"
            ref={fileInputRef}
          />
        </label>
        <Show when={selectedFile()}>
          <div class="mb-4">
            <p class="text-gray-700 font-semibold">الملف المحدد: {selectedFile().name}</p>
          </div>
        </Show>
        <div class="flex space-x-4 space-x-reverse">
          <button
            class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform ${
              (loadingOCR() || loadingAI()) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleExtractText}
            disabled={loadingOCR() || loadingAI()}
          >
            <Show when={!loadingOCR() && !loadingAI()} fallback="جاري المعالجة...">
              استخراج النص
            </Show>
          </button>
          <button
            class="cursor-pointer px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform"
            onClick={handleReset}
          >
            إعادة تعيين
          </button>
        </div>
      </div>
      <Show when={error()}>
        <div class="mt-4 text-red-600 font-semibold text-center">
          {error()}
        </div>
      </Show>
      <Show when={processedText() || extractedText()}>
        <TextDisplay
          processedText={processedText}
          extractedText={extractedText}
          audioUrl={audioUrl}
          setAudioUrl={setAudioUrl}
          loadingTTS={loadingTTS}
          setLoadingTTS={setLoadingTTS}
        />
      </Show>
    </div>
  );
}

export default PDFReader;