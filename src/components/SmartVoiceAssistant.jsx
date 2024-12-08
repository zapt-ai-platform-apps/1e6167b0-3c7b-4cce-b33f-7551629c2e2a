import { Show } from 'solid-js';
import MessageList from './MessageList';
import SpeakButton from './SpeakButton';
import { useAssistantInteractions } from '../hooks/useAssistantInteractions';

function SmartVoiceAssistant() {
  const {
    messages,
    loading,
    audioUrl,
    listening,
    startRecognition,
    stopRecognition,
  } = useAssistantInteractions();

  const handleListen = () => {
    if (listening()) {
      stopRecognition();
    } else {
      startRecognition();
    }
  };

  return (
    <div class="flex flex-col flex-grow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-purple-600">المساعد الصوتي الذكي</h2>
      </div>
      <div class="flex flex-col mb-4">
        <SpeakButton
          listening={listening}
          onListen={handleListen}
          disabled={loading}
        />
      </div>
      <div class="mb-4">
        <Show when={messages().length > 0}>
          <MessageList messages={messages} />
        </Show>
      </div>
      <Show when={loading()}>
        <p class="text-center text-gray-600">جارٍ معالجة...</p>
      </Show>
      <Show when={audioUrl()}>
        <div class="mb-4">
          <audio controls src={audioUrl()} class="w-full">
            متصفحك لا يدعم تشغيل الصوت. يرجى تحديث المتصفح أو استخدام متصفح آخر.
          </audio>
        </div>
      </Show>
    </div>
  );
}

export default SmartVoiceAssistant;