import { createSignal, Show, For, onCleanup, onMount } from 'solid-js';
import Tesseract from 'tesseract.js';

function ImageTextExtractor() {
  const [imageFile, setImageFile] = createSignal(null);
  const [extractedText, setExtractedText] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [progress, setProgress] = createSignal(0);
  const [selectedLanguage, setSelectedLanguage] = createSignal('ara');

  const languages = [
    { code: 'ara', name: 'العربية' },
    { code: 'eng', name: 'English' },
    { code: 'fra', name: 'Français' },
    { code: 'spa', name: 'Español' },
    { code: 'deu', name: 'Deutsch' },
    { code: 'chi_sim', name: '中文 (简体)' },
    { code: 'jpn', name: '日本語' },
    { code: 'rus', name: 'Русский' },
    // Add more languages as needed
  ];

  let worker = null;

  const preprocessImage = (imageFile) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(imageFile);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Convert to grayscale and enhance contrast
        for (let i = 0; i < data.length; i += 4) {
          // Grayscale
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

          // Increase contrast
          const factor = (259 * (128 + 255)) / (255 * (259 - 128));
          const contrast = factor * (avg - 128) + 128;

          data[i] = contrast;     // Red
          data[i + 1] = contrast; // Green
          data[i + 2] = contrast; // Blue
        }

        // Put the processed data back
        ctx.putImageData(imageData, 0, 0);

        // Convert canvas to blob
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };
      img.onerror = (e) => {
        reject(e);
      };
      img.src = url;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleExtractText = async () => {
    if (!imageFile() || !selectedLanguage()) {
      alert('يرجى اختيار صورة ولغة أولاً.');
      return;
    }

    setLoading(true);
    setExtractedText('');
    setProgress(0);

    worker = Tesseract.createWorker({
      logger: m => {
        if (m.status === 'recognizing text') {
          setProgress(Math.round(m.progress * 100));
        }
      },
    });

    try {
      await worker.load();
      await worker.loadLanguage(selectedLanguage());
      await worker.initialize(selectedLanguage());

      const preprocessedBlob = await preprocessImage(imageFile());

      const { data: { text } } = await worker.recognize(preprocessedBlob);

      if (text.trim() === '') {
        setExtractedText('لم يتم العثور على نص في الصورة.');
      } else {
        setExtractedText(text);
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      alert(`حدث خطأ أثناء استخراج النص: ${error.message || error}. يرجى المحاولة مرة أخرى.`);
    } finally {
      if (worker) {
        await worker.terminate();
        worker = null;
      }
      setLoading(false);
    }
  };

  onCleanup(async () => {
    if (worker) {
      await worker.terminate();
      worker = null;
    }
  });

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">استخراج النص من الصورة</h2>
        <p class="text-lg text-center text-gray-700">استخدم التقنية الذكية لاستخراج النصوص من الصور بسهولة وخصوصية</p>
      </div>
      <div class="flex flex-col items-center mb-4 space-y-4">
        <div class="w-full">
          <label class="block mb-2 text-gray-700 font-semibold">اختر اللغة:</label>
          <select
            value={selectedLanguage()}
            onInput={(e) => setSelectedLanguage(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer box-border"
          >
            <option value="">اختر اللغة</option>
            <For each={languages}>
              {(language) => (
                <option value={language.code}>{language.name}</option>
              )}
            </For>
          </select>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleExtractText}
          disabled={loading() || !imageFile() || !selectedLanguage()}
        >
          <Show when={!loading()} fallback={`جاري استخراج النص... ${progress()}%`}>
            استخراج النص
          </Show>
        </button>
      </div>
      <Show when={extractedText()}>
        <div class="mt-4 w-full">
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