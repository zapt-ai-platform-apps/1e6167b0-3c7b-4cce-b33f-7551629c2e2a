function GeneratedImage(props) {
  const { generatedImage, handleDownloadImage } = props;

  return (
    <div class="mt-4 p-6 bg-white rounded-lg shadow-md w-full max-w-2xl">
      <h3 class="text-2xl font-bold mb-4 text-purple-600">الصورة المُولدة:</h3>
      <img src={generatedImage()} alt="الصورة المولدة" class="w-full rounded-lg shadow-md mb-4" />
      <button
        class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform box-border"
        onClick={handleDownloadImage}
      >
        تحميل الصورة
      </button>
    </div>
  );
}

export default GeneratedImage;