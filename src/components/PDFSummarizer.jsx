import { createSignal, Show } from 'solid-js';

function PDFSummarizer() {
  const [selectedFile, setSelectedFile] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [summary, setSummary] = createSignal('');
  const [error, setError] = createSignal('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSummary('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile()) {
      setError('يرجى اختيار ملف PDF.');
      return;
    }
    setLoading(true);
    setError('');
    setSummary('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile());

      const response = await fetch('/api/summarize-pdf', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSummary(result.summary);
      } else {
        setError(result.error || 'حدث خطأ أثناء تلخيص المستند.');
      }
    } catch (err) {
      console.error('Error summarizing PDF:', err);
      setError('حدث خطأ أثناء تلخيص المستند. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow min-h-screen px-4">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">ملخص المستندات الذكي</h2>
        <p class="text-lg text-center text-gray-700">قم بتحميل ملف PDF واحصل على ملخص سريع باستخدام الذكاء الاصطناعي</p>
      </div>
      <form onSubmit={handleSubmit} class="flex flex-col space-y-4 items-center">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          class="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
        />
        <button
          type="submit"
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          {loading() ? 'جاري تلخيص المستند...' : 'تلخيص المستند'}
        </button>
      </form>
      <Show when={error()}>
        <p class="mt-4 text-red-600 text-center">{error()}</p>
      </Show>
      <Show when={summary()}>
        <div class="mt-8">
          <h3 class="text-lg font-bold mb-2 text-purple-600">ملخص المستند:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white">
            <p class="whitespace-pre-wrap text-gray-800">{summary()}</p>
          </div>
          <button
            class="cursor-pointer mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border"
            onClick={() => {
              // Copy summary to clipboard
              navigator.clipboard.writeText(summary()).then(() => {
                alert('تم نسخ الملخص إلى الحافظة.');
              }, (err) => {
                console.error('Error copying to clipboard:', err);
              });
            }}
          >
            نسخ الملخص
          </button>
        </div>
      </Show>
    </div>
  );
}

export default PDFSummarizer;