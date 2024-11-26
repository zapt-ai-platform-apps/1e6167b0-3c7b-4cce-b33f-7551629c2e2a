import { createSignal, onCleanup } from 'solid-js';
import { createEvent } from '../supabaseClient';

function SmartVoiceAssistant() {
  const [messages, setMessages] = createSignal([
    { role: 'assistant', content: 'مرحباً! أنا المساعد الصوتي الذكي. كيف يمكنني مساعدتك اليوم؟' },
  ]);
  const [listening, setListening] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  let recognition;

  if ('webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'ar-EG';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async function(event) {
      const transcript = event.results[0][0].transcript;
      setMessages([...messages(), { role: 'user', content: transcript }]);
      setLoading(true);
      try {
        const response = await createEvent('chatgpt_request', {
          prompt: transcript,
          response_type: 'text',
        });
        setMessages([...messages(), { role: 'assistant', content: response }]);
        speak(response);
      } catch (error) {
        console.error('Error communicating with assistant:', error);
        const errorMessage = 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.';
        setMessages([...messages(), { role: 'assistant', content: errorMessage }]);
        speak(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = function() {
      setListening(false);
    };
  } else {
    alert('متصفحك لا يدعم التعرف على الصوت.');
  }

  const handleListen = () => {
    if (recognition) {
      if (!listening()) {
        recognition.start();
        setListening(true);
      } else {
        recognition.stop();
        setListening(false);
      }
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-EG';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('متصفحك لا يدعم تحويل النص إلى كلام.');
    }
  };

  onCleanup(() => {
    if (recognition && listening()) {
      recognition.stop();
    }
  });

  return (
    <div class="flex flex-col flex-grow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-purple-600">المساعد الصوتي الذكي</h2>
      </div>
      <div class="flex-grow overflow-y-auto mb-4 p-2 border border-gray-300 rounded">
        {messages().map((message) => (
          <div class={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div class={`inline-block px-3 py-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100 text-gray-800' : 'bg-gray-100 text-gray-800'}`}>
              {message.content}
            </div>
          </div>
        ))}
        {loading() && (
          <div class="text-left">
            <div class="inline-block px-3 py-2 rounded-lg bg-gray-100 text-gray-800">
              جاري المعالجة...
            </div>
          </div>
        )}
      </div>
      <div class="flex justify-center">
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300 ease-in-out transform box-border ${listening() ? 'bg-red-600 hover:bg-red-700' : ''}`}
          onClick={handleListen}
          disabled={loading()}
        >
          {listening() ? 'إيقاف' : 'تحدث'}
        </button>
      </div>
    </div>
  );
}

export default SmartVoiceAssistant;