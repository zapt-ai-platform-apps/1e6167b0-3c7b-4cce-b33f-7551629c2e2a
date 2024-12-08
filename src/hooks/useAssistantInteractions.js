import { createSignal, onCleanup } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { useSpeechRecognition } from './useSpeechRecognition';
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
  const [listening, setListening] = createSignal(false);

  const { startRecognition, stopRecognition } = useSpeechRecognition(
    async (transcript) => {
      console.log('User said:', transcript);
      setMessages((prev) => [...prev, { role: 'user', content: transcript }]);
      setLoading(true);
      try {
        // Prepare conversation context
        const conversation = messages()
          .slice(-5)
          .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
          .join('\n');
        const prompt = `${conversation}\nUser: ${transcript}\nAssistant:`;

        console.log('Sending prompt to backend:', prompt);

        const response = await createEvent('chatgpt_request', {
          prompt: prompt,
          response_type: 'text',
        });

        setMessages((prev) => [...prev, { role: 'assistant', content: response }]);

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
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    (error) => {
      console.error('Speech recognition error:', error);
      setLoading(false);
    },
    setListening
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