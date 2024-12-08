function AudioItem(props) {
  const { audio, currentAudio, isPlaying, handlePlayPause } = props;

  return (
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 class="text-xl font-bold mb-2 text-primary-dark">{audio.title}</h3>
      <p class="text-gray-700 mb-4">{audio.description}</p>
      <button
        class={`cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border ${
          currentAudio() && currentAudio().audioUrl === audio.audioUrl && isPlaying() ? 'bg-red-600 hover:bg-red-700' : ''
        }`}
        onClick={() => handlePlayPause(audio)}
      >
        {currentAudio() && currentAudio().audioUrl === audio.audioUrl && isPlaying() ? 'إيقاف' : 'تشغيل'}
      </button>
    </div>
  );
}

export default AudioItem;