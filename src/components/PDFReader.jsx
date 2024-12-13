import { createSignal, Show } from 'solid-js';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { processTextWithAI } from '../utils/aiApi';
import FileUploader from './FileUploader';
import PageSelector from './PageSelector';
import ExtractedTextDisplay from './ExtractedTextDisplay';

function PDFReader() {
  const [selectedFile, setSelectedFile] = createSignal(null);
  const [fileName, setFileName] = createSignal('');
  const [extractedText, setExtractedText] = createSignal('');
  const [processedText, setProcessedText] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');
  const [audioUrl, setAudioUrl] = createSignal('');
  const [loadingTTS, setLoadingTTS] = createSignal(false);
  const [pageCount, setPageCount] = createSignal(0);
  const [selectedPages, setSelectedPages] = createSignal([]);
  const [processAllPages, setProcessAllPages] = createSignal(true);

  const pdfjsVersion = '3.6.172';
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

  const handleExtractText = async () => {
    if (!selectedFile()) {
      alert('يرجى اختيار ملف PDF أولاً.');
      return;
    }

    setLoading(true);
    setExtractedText('');
    setProcessedText('');
    setError('');
    setAudioUrl('');

    try {
      const reader = new FileReader();
      reader.onload = async function () {
        const typedarray = new Uint8Array(this.result);
        const pdf = await getDocument({ data: typedarray }).promise;
        setPageCount(pdf.numPages);

        let pagesToProcess = [];
        if (processAllPages()) {
          for (let i = 1; i <= pdf.numPages; i++) {
            pagesToProcess.push(i);
          }
        } else if (selectedPages().length > 0) {
          pagesToProcess = selectedPages();
        } else {
          setError('يرجى تحديد الصفحات المراد استخراج النص منها.');
          setLoading(false);
          return;
        }

        let fullText = '';
        for (let pageNum of pagesToProcess) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const strings = content.items.map(item => item.str);
          fullText += strings.join(' ') + '\n\n';
        }

        setExtractedText(fullText);

        const processed = await processTextWithAI(fullText, setError);
        if (processed) {
          setProcessedText(processed);
        }
      };
      reader.readAsArrayBuffer(selectedFile());
    } catch (err) {
      console.error('Error:', err);
      setError('حدث خطأ أثناء معالجة الملف.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileName('');
    setExtractedText('');
    setProcessedText('');
    setError('');
    setAudioUrl('');
    setPageCount(0);
    setSelectedPages([]);
    setProcessAllPages(true);
  };

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">قارئ PDF الاحترافي</h2>
        <p class="text-lg text-center text-gray-700">
          قم بتحميل ملف PDF يحتوي على نص ليتم استخراج نص صحيح ومنسق احترافيًا باستخدام تقنية الذكاء الاصطناعي
        </p>
      </div>
      <FileUploader
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        fileName={fileName}
        setFileName={setFileName}
        setExtractedText={setExtractedText}
        setProcessedText={setProcessedText}
        setError={setError}
        setAudioUrl={setAudioUrl}
      />
      <Show when={selectedFile() && pageCount() > 0}>
        <PageSelector
          processAllPages={processAllPages}
          setProcessAllPages={setProcessAllPages}
          pageCount={pageCount}
          selectedPages={selectedPages}
          setSelectedPages={setSelectedPages}
        />
      </Show>
      <div class="flex space-x-4 space-x-reverse mt-4">
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleExtractText}
          disabled={loading()}
        >
          {loading() ? 'جار معالجة الملف...' : 'قراءة'}
        </button>
        <button
          class="cursor-pointer px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform"
          onClick={handleReset}
        >
          إعادة تعيين
        </button>
      </div>
      <Show when={error()}>
        <div class="mt-4 text-red-600 font-semibold text-center">{error()}</div>
      </Show>
      <ExtractedTextDisplay
        processedText={processedText}
        extractedText={extractedText}
        setAudioUrl={setAudioUrl}
        audioUrl={audioUrl}
        loadingTTS={loadingTTS}
        setLoadingTTS={setLoadingTTS}
      />
    </div>
  );
}

export default PDFReader;