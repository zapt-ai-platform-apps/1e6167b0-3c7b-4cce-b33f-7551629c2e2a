function PlayerControls(props) {
  return (
    <div>
      <div class="mt-4 flex items-center justify-center space-x-4 space-x-reverse">
        <button
          class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform box-border"
          onClick={props.handlePreviousStation}
        >
          المحطة السابقة
        </button>
        <button
          class={`cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform box-border ${
            props.isPlaying() ? 'bg-red-500 hover:bg-red-600' : ''
          }`}
          onClick={props.handlePlayPause}
        >
          {props.isPlaying() ? 'إيقاف' : 'تشغيل'}
        </button>
        <button
          class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform box-border"
          onClick={props.handleNextStation}
        >
          المحطة التالية
        </button>
      </div>
      <audio
        ref={props.audioRef}
        src=""
        class="hidden"
      />
    </div>
  );
}

export default PlayerControls;