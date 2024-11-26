import { createSignal, Show, For } from 'solid-js';
import { createEvent } from '../supabaseClient';

function ArticleGenerator() {
  const [topic, setTopic] = createSignal('');
  const [contentType, setContentType] = createSignal('');
  const [generatedContent, setGeneratedContent] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const contentTypes = [
    'مقال',
    'منشور',
    'رسالة',
    'بحث',
    'تقرير',
    'مراسلة',
    'قصة',
  ];

  const handleGenerateContent = async () => {
    if (!topic() || !contentType()) return;

    setLoading(true);
    setGeneratedContent('');

    const prompt = `يرجى كتابة ${contentType()} شامل ومفصل حول الموضوع التالي: ${topic()}`;

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });

      setGeneratedContent(response);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('حدث خطأ أثناء توليد المحتوى. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">منشئ جميع أنواع المحتوى النصي</h2>
        <p class="text-lg text-center text-gray-700">أدخل الموضوع واختر نوع المحتوى لتوليد نص مخصص</p>
      </div>
      <div class="flex flex-col mb-4">
        <input
          type="text"
          value={topic()}
          onInput={(e) => setTopic(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border mb-4"
          placeholder="أدخل الموضوع..."
        />
        <select
          value={contentType()}
          onInput={(e) => setContentType(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer mb-4"
        >
          <option value="">اختر نوع المحتوى</option>
          <For each={contentTypes}>
            {(type) => (
              <option value={type}>{type}</option>
            )}
          </For>
        </select>
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleGenerateContent}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري التوليد...">
            إنشاء
          </Show>
        </button>
      </div>
      <Show when={generatedContent()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">{`${contentType()} المُولد:`}</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white">
            <p class="whitespace-pre-wrap text-gray-800">{generatedContent()}</p>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default ArticleGenerator;