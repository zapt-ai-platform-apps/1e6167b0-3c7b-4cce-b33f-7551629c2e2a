import { createEffect } from 'solid-js';

function FileUploader(props) {
  let fileInputRef;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    props.setSelectedFile(file);
    props.setFileName(file ? file.name : '');
    props.setExtractedText('');
    props.setProcessedText('');
    props.setError('');
    props.setAudioUrl('');
  };

  createEffect(() => {
    if (!props.selectedFile() && fileInputRef) {
      fileInputRef.value = '';
    }
  });

  return (
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
        <span class="text-gray-700">{props.fileName() || 'انقر هنا لاختيار ملف PDF'}</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          class="hidden"
          ref={fileInputRef}
        />
      </label>
    </div>
  );
}

export default FileUploader;