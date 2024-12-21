import { Show } from 'solid-js';
import usePDFProcessing from '../hooks/usePDFProcessing';
import FileUploader from './FileUploader';
import PageSelector from './PageSelector';
import ExtractedTextDisplay from './ExtractedTextDisplay';

function PDFReader() {
  const {
    selectedFile,
    setSelectedFile,
    fileName,
    setFileName,
    extractedText,
    setExtractedText,
    processedText,
    setProcessedText,
    loading,
    error,
    audioUrl,
    loadingTTS,
    setLoadingTTS,
    pageCount,
    selectedPages,
    setSelectedPages,
    processAllPages,
    setProcessAllPages,
    handleExtractText,
    handleReset,
    setError,
    setAudioUrl,
  } = usePDFProcessing();

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