import { Show } from 'solid-js';

function ImageUploader(props) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    props.setSelectedImage(file);
    props.setGeneratedDescription('');
    props.setError('');

    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        props.setImagePreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      props.setImagePreview(null);
    }
  };

  return (
    <>
      <div class="mb-4">
        <label class="cursor-pointer flex flex-col items-center bg-white rounded-lg border border-gray-300 p-4 hover:bg-gray-100 transition">
          <svg
            class="w-8 h-8 mb-2 text-gray-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.94l-5-5a.75.75 0 10-1.06 1.06L14.44 9H9a7 7 0 00-.2 13.94 7 7 0 007-7v-5.44l3.06 3.06a.75.75 0 001.06-1.06l-5-5z" />
          </svg>
          <span class="text-gray-700">
            {props.selectedImage() ? props.selectedImage().name : 'انقر هنا لاختيار صورة'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            class="hidden"
            ref={props.fileInputRef}
          />
        </label>
      </div>
      <Show when={props.imagePreview()}>
        <div class="mb-4">
          <img
            src={props.imagePreview()}
            alt="معاينة الصورة"
            class="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </Show>
    </>
  );
}

export default ImageUploader;