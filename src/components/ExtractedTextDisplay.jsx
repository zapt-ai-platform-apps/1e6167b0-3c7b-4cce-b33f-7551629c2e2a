function ExtractedTextDisplay(props) {
  return (
    <div class="mt-4">
      <h3 class="text-lg font-bold mb-2 text-purple-600">النص الناتج:</h3>
      <div class="p-4 border border-gray-300 rounded-lg bg-white" dir="rtl">
        <p
          class="whitespace-pre-wrap text-gray-800"
          style={{ 'font-family': "'Noto Kufi Arabic', 'Tahoma', sans-serif" }}
        >
          {props.processedText() || props.extractedText()}
        </p>
      </div>
      <div class="mt-4 flex flex-wrap space-x-4 space-x-reverse">
        <button
          class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform mt-2"
          onClick={props.handleCopyText}
        >
          نسخ النص
        </button>
        <button
          class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform mt-2"
          onClick={props.handleDownloadText}
        >
          تنزيل كنص
        </button>
        <button
          class="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out transform mt-2"
          onClick={props.handleDownloadDocx}
        >
          تنزيل كملف Word
        </button>
      </div>
    </div>
  );
}

export default ExtractedTextDisplay;