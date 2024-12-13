import { createSignal, Show } from 'solid-js';
import { extractTextFromPDF } from '../utils/ocrApi';
import { processTextWithAI } from '../utils/aiApi';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';
import FileUploader from './FileUploader';
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
      const extracted = await extractTextFromPDF(selectedFile(), setError);
      if (extracted) {
        setExtractedText(extracted);

        const processed = await processTextWithAI(extracted, setError);
        if (processed) {
          setProcessedText(processed);
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setError('حدث خطأ أثناء معالجة الملف.');
    } finally {
      setLoading(false);
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
      saveAs(blob, 'extracted_text.txt');
    }
  };

  const handleDownloadDocx = async () => {
    const text = processedText() || extractedText();
    if (text) {
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: text,
                bidirectional: true,
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'extracted_text.docx');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileName('');
    setExtractedText('');
    setProcessedText('');
    setError('');
    setAudioUrl('');
  };

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">قارئ PDF الاحترافي</h2>
        <p class="text-lg text-center text-gray-700">
          قم بتحميل ملف PDF يحتوي على نص ليتم استخراج نص صحيح ومنسق احترافيًا باستخدام تقنية OCR والذكاء الاصطناعي
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
      <div class="flex space-x-4 space-x-reverse">
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
      <Show when={processedText() || extractedText()}>
        <ExtractedTextDisplay
          extractedText={extractedText}
          processedText={processedText}
          handleCopyText={handleCopyText}
          handleDownloadText={handleDownloadText}
          handleDownloadDocx={handleDownloadDocx}
        />
      </Show>
    </div>
  );
}

export default PDFReader;