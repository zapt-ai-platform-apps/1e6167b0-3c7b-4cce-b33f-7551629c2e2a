import TextActions from './TextActions';
import AudioPlayer from './AudioPlayer';
import { Show } from 'solid-js';

function ExtractedTextDisplay(props) {
  const { processedText, extractedText, setAudioUrl, audioUrl, loadingTTS, setLoadingTTS } = props;

  return (
    <Show when={processedText() || extractedText()}>
      <div class="mt-4">
        <TextActions
          processedText={processedText}
          extractedText={extractedText}
          setAudioUrl={setAudioUrl}
          loadingTTS={loadingTTS}
          setLoadingTTS={setLoadingTTS}
        />
        <div class="mt-4 p-6 bg-white rounded-lg shadow-md">
          <h3 class="text-2xl font-bold mb-4 text-purple-600">النص الناتج</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white" dir="rtl">
            <div
              class="whitespace-pre-wrap text-gray-800"
              style={{ 'font-family': "'Noto Kufi Arabic', 'Tahoma', sans-serif" }}
            >
              {processedText() || extractedText()}
            </div>
          </div>
          <AudioPlayer audioUrl={audioUrl} />
        </div>
      </div>
    </Show>
  );
}

export default ExtractedTextDisplay;