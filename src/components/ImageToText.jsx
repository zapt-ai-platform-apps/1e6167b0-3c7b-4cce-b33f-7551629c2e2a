import { createSignal, Show, onCleanup } from 'solid-js';
import { extractTextFromImage } from '../utils/ocrApi';
import { processTextWithAI } from '../utils/aiApi';

function ImageToText() {
  const [selectedFile, setSelectedFile] = createSignal(null);
  const [imagePreview, setImagePreview] = createSignal(null);
  const [extractedText, setExtractedText] = createSignal('');
  const [processedText, setProcessedText] = createSignal('');
  const [loadingOCR, setLoadingOCR] = createSignal(false);
  const [loadingAI, setLoadingAI] = createSignal(false);
  const [error, setError] = createSignal('');

  let fileInputRef;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setExtractedText('');
    setProcessedText('');
    setError('');

    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleExtractText = async () => {
    if (!selectedFile()) {
      alert('يرجى اختيار صورة أولاً.');
      return;
    }

    setLoadingOCR(true);
    setExtractedText('');
    setProcessedText('');
    setError('');

    const extracted = await extractTextFromImage(selectedFile(), setError);
    setLoadingOCR(false);

    if (extracted) {
      setExtractedText(extracted);

      setLoadingAI(true);
      const processed = await processTextWithAI(extracted, setError);
      setLoadingAI(false);

      if (processed) {
        setProcessedText(processed);
      }
    }
  };

  const handleCopyText = () => {
    const text = processedText() || extractedText();
    if (text) {
      navigator.clipboard.writeText(text).then(
        () => {
          alert('تم نسخ النص إلى الحافظة.');
        },
        () => {
          alert('حدث خطأ أثناء نسخ النص.');
        }
      );
    }
  };

  const handleDownloadText = () => {
    const text = processedText() || extractedText();
    if (text) {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'extracted_text.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setExtractedText('');
    setProcessedText('');
    setError('');
    if (fileInputRef) {
      fileInputRef.value = '';
    }
  };

  onCleanup(() => {
    if (imagePreview()) {
      URL.revokeObjectURL(imagePreview());
    }
  });

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">أداة استخراج النص من الصورة</h2>
        <p class="text-lg text-center text-gray-700">
          قم بتحميل صورة تحتوي على نص ليتم استخراج نص صحيح ومنسق احترافيًا باستخدام تقنية OCR والذكاء الاصطناعي
        </p>
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
          <span class="text-gray-700">انقر هنا لاختيار صورة</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            class="hidden"
            ref={fileInputRef}
          />
        </label>
        <Show when={imagePreview()}>
          <div class="mb-4">
            <img src={imagePreview()} alt="معاينة الصورة" class="max-w-full h-auto rounded-lg shadow-md" />
          </div>
        </Show>
        <div class="flex space-x-4 space-x-reverse">
          <button
            class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform ${
              loadingOCR() || loadingAI() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleExtractText}
            disabled={loadingOCR() || loadingAI()}
          >
            {loadingOCR()
              ? 'جار استخراج النص...'
              : loadingAI()
              ? 'جار معالجة النص...'
              : 'استخراج النص'}
          </button>
          <button
            class={`cursor-pointer px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform`}
            onClick={handleReset}
          >
            إعادة تعيين
          </button>
        </div>
      </div>
      <Show when={error()}>
        <div class="mt-4 text-red-600 font-semibold text-center">{error()}</div>
      </Show>
      <Show when={processedText() || extractedText()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">النص الناتج:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white" dir="rtl">
            <p
              class="whitespace-pre-wrap text-gray-800"
              style={{ 'font-family': "'Noto Kufi Arabic', 'Tahoma', sans-serif" }}
            >
              {processedText() || extractedText()}
            </p>
          </div>
          <div class="mt-4 flex space-x-4 space-x-reverse">
            <button
              class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform"
              onClick={handleCopyText}
            >
              نسخ النص
            </button>
            <button
              class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform"
              onClick={handleDownloadText}
            >
              تنزيل النص
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default ImageToText;