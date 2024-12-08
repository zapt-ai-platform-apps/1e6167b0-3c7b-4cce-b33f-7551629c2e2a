import { createSignal, onCleanup } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { playAudio } from '../utils/audioPlayer';

export function useAssistantInteractions() {
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
        setMessages([...messages(), { role: 'assistant', content: response }]);

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
            content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.',
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

  return {
    messages,
    loading,
    audioUrl,
    listening,
    startRecognition,
    stopRecognition,
  };
}