import { createSignal } from 'solid-js';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { processTextWithAI } from '../utils/aiApi';

function usePDFProcessing() {
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

  GlobalWorkerOptions.workerSrc = workerSrc;

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

  return {
    selectedFile,
    setSelectedFile,
    fileName,
    setFileName,
    extractedText,
    setExtractedText,
    processedText,
    setProcessedText,
    loading,
    setLoading,
    error,
    setError,
    audioUrl,
    setAudioUrl,
    loadingTTS,
    setLoadingTTS,
    pageCount,
    setPageCount,
    selectedPages,
    setSelectedPages,
    processAllPages,
    setProcessAllPages,
    handleExtractText,
    handleReset,
  };
}

export default usePDFProcessing;