import { Show } from 'solid-js';
import TextActions from './TextActions';
import AudioPlayer from './AudioPlayer';

function TextDisplay(props) {
  const {
    processedText,
    extractedText,
    audioUrl,
    setAudioUrl,
    loadingTTS,
    setLoadingTTS,
  } = props;

  return (
    <div class="mt-4 p-6 bg-white rounded-lg shadow-md">
      <h3 class="text-2xl font-bold mb-4 text-purple-600">النص الناتج</h3>
      <div class="p-4 border border-gray-300 rounded-lg bg-white" dir="rtl">
        <p
          class="whitespace-pre-wrap text-gray-800 leading-relaxed"
          style={{ 'font-family': "'Noto Kufi Arabic', 'Tahoma', sans-serif" }}
        >
          {processedText() || extractedText()}
        </p>
      </div>
      <TextActions
        processedText={processedText}
        extractedText={extractedText}
        setAudioUrl={setAudioUrl}
        loadingTTS={loadingTTS}
        setLoadingTTS={setLoadingTTS}
      />
      <AudioPlayer audioUrl={audioUrl} />
    </div>
  );
}

export default TextDisplay;