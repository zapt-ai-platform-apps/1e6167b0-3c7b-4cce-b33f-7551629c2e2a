function HeaderComponent(props) {
  return (
    <header class="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-8">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">{props.appTitle}</h1>
        <p class="text-xl">{props.appDescription}</p>
        <div class="mt-6">
          <button
            class="cursor-pointer px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform"
            onClick={props.handlePlayPause}
          >
            {props.isPlaying() ? 'إيقاف المقطع الصوتي' : 'تشغيل المقطع الصوتي'}
          </button>
          <audio
            ref={(el) => props.setAudioRef(el)}
            src={props.audioLink}
            class="hidden"
          >
            متصفحك لا يدعم تشغيل الصوت. يرجى تحديث المتصفح أو استخدام متصفح آخر.
          </audio>
        </div>
        <button
          class="cursor-pointer mt-6 px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => window.open(props.appDownloadLink, '_blank')}
        >
          تحميل التطبيق
        </button>
      </div>
    </header>
  );
}

export default HeaderComponent;