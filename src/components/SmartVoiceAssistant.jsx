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
      <div class="flex flex-col mb-4 items-center">
        <SpeakButton
          listening={listening}
          onListen={handleListen}
          disabled={loading()}
        />
        <Show when={listening()}>
          <div class="mt-2 text-green-600 font-semibold">جارٍ الاستماع...</div>
        </Show>
      </div>
      <div class="mb-4 flex-grow overflow-y-auto p-2 border border-gray-300 rounded">
        <Show when={messages().length > 0}>
          <MessageList messages={messages} />
        </Show>
        <Show when={loading()}>
          <div class="text-left">
            <div class="inline-block px-3 py-2 rounded-lg bg-gray-100 text-gray-800">
              جارٍ معالجة...
            </div>
          </div>
        </Show>
      </div>
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