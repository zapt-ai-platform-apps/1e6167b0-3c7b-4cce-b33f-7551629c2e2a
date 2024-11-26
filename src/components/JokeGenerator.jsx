import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function JokeGenerator() {
  const [joke, setJoke] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const generateJoke = async () => {
    setLoading(true);
    setJoke('');
    try {
      const response = await createEvent('chatgpt_request', {
        prompt: 'أخبرني نكتة مضحكة باللغة العربية.',
        response_type: 'text',
      });
      setJoke(response);
    } catch (error) {
      console.error('Error generating joke:', error);
      alert('حدث خطأ أثناء توليد النكتة. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center flex-grow">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">مولد النكات</h2>
      <button
        class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border mb-4 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={generateJoke}
        disabled={loading()}
      >
        {loading() ? 'جاري توليد النكتة...' : 'أخبرني نكتة'}
      </button>
      <Show when={joke()}>
        <div class="mt-4 p-4 border border-gray-300 rounded-lg bg-white max-w-md text-center">
          <p class="whitespace-pre-wrap text-gray-800">{joke()}</p>
        </div>
      </Show>
    </div>
  );
}

export default JokeGenerator;