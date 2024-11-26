import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function ArticleGenerator() {
  const [topic, setTopic] = createSignal('');
  const [generatedArticle, setGeneratedArticle] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleGenerateArticle = async () => {
    if (!topic()) return;

    setLoading(true);
    setGeneratedArticle('');

    const prompt = `يرجى كتابة مقال شامل ومفصل حول الموضوع التالي: ${topic()}`;

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });

      setGeneratedArticle(response);
    } catch (error) {
      console.error('Error generating article:', error);
      alert('حدث خطأ أثناء توليد المقال. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow px-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-purple-600">مولد المقالات</h2>
      </div>
      <div class="flex flex-col mb-4">
        <input
          type="text"
          value={topic()}
          onInput={(e) => setTopic(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border mb-4"
          placeholder="أدخل موضوع المقال..."
        />
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleGenerateArticle}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري التوليد...">
            توليد المقال
          </Show>
        </button>
      </div>
      <Show when={generatedArticle()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">المقال المُولد:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white">
            <p class="whitespace-pre-wrap text-gray-800">{generatedArticle()}</p>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default ArticleGenerator;