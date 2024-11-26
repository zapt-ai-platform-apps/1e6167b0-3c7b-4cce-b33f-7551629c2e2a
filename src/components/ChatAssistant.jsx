import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';

function ChatAssistant() {
  const [messages, setMessages] = createSignal([
    { role: 'assistant', content: 'مرحباً! أنا المساعد الذكي. كيف يمكنني مساعدتك اليوم؟' },
  ]);
  const [userInput, setUserInput] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSendMessage = async () => {
    const input = userInput().trim();
    if (!input) return;

    setMessages([...messages(), { role: 'user', content: input }]);
    setUserInput('');
    setLoading(true);

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: input,
        response_type: 'text',
      });

      setMessages([...messages(), { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error communicating with assistant:', error);
      setMessages([...messages(), { role: 'assistant', content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div class="flex flex-col flex-grow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-purple-600">المساعد الذكي</h2>
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
      <div>
        <textarea
          value={userInput()}
          onInput={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-20 mb-2"
          placeholder="اكتب رسالتك هنا..."
          disabled={loading()}
        ></textarea>
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSendMessage}
          disabled={loading()}
        >
          إرسال
        </button>
      </div>
    </div>
  );
}

export default ChatAssistant;