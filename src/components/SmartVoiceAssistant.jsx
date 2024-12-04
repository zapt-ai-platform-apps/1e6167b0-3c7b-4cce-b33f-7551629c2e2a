import { createSignal, onMount, onCleanup, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import MessageList from './MessageList';
import SpeakButton from './SpeakButton';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { playAudio } from '../utils/audioPlayer';

function SmartVoiceAssistant() {
  const [messages, setMessages] = createSignal([
    {
      role: 'assistant',
      content: 'مرحباً! أنا المساعد الصوتي الذكي. كيف يمكنني مساعدتك اليوم؟',
    },
  ]);
  const [loading, setLoading] = createSignal(false);
  const [audioUrl, setAudioUrl] = createSignal('');

  const { listening, startRecognition, stopRecognition } = useSpeechRecognition(
    async (transcript) => {
      setMessages([...messages(), { role: 'user', content: transcript }]);
      setLoading(true);
      try {
        const response = await createEvent('chatgpt_request', {
          prompt: transcript,
          response_type: 'text',
        });
        setMessages([
          ...messages(),
          { role: 'assistant', content: response },
        ]);

        // Generate AI voice audio
        const audioResponse = await createEvent('text_to_speech', {
          text: response,
        });

        if (audioResponse) {
          setAudioUrl(audioResponse);
          playAudio(audioResponse);
        } else {
          alert('حدث خطأ أثناء توليد الصوت.');
        }
      } catch (error) {
        console.error('Error communicating with assistant:', error);
        setMessages([
          ...messages(),
          {
            role: 'assistant',
            content:
              'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    () => {
      setLoading(false);
    }
  );

  onCleanup(() => {
    stopRecognition();
  });

  return (
    <div class="flex flex-col flex-grow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-purple-600">المساعد الصوتي الذكي</h2>
      </div>
      <div class="flex flex-col mb-4">
        <SpeakButton
          listening={listening()}
          onListen={listening() ? stopRecognition : startRecognition}
          disabled={loading()}
        />
      </div>
      <div class="mb-4">
        <Show when={messages().length > 0}>
          <MessageList messages={messages()} />
        </Show>
      </div>
      <Show when={loading()}>
        <p class="text-center text-gray-600">جارٍ معالجة...</p>
      </Show>
      <Show when={audioUrl()}>
        <div class="mb-4">
          <audio controls src={audioUrl()} class="w-full" />
        </div>
      </Show>
    </div>
  );
}

export default SmartVoiceAssistant;