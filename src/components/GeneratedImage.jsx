function GeneratedImage(props) {
  return (
    <div class="mt-8">
      <h3 class="text-2xl font-bold text-center mb-4">{props.title()}</h3>
      <img
        src={props.generatedImage()}
        alt={props.title()}
        class="max-w-full h-auto mx-auto"
      />
      <div class="flex items-center justify-center mt-4">
        <button
          type="button"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={props.handleDownloadImage}
        >
          تحميل الصورة
        </button>
      </div>
    </div>
  );
}

export default GeneratedImage;