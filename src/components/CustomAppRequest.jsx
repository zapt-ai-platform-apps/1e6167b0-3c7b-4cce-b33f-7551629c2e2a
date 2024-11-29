import { createSignal, Show } from 'solid-js';
import { supabase } from '../supabaseClient';

function CustomAppRequest() {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [details, setDetails] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');
  const [error, setError] = createSignal('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading()) return;
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // إرسال الطلب إلى API الخلفية
      const response = await fetch('/api/custom-app-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name(),
          email: email(),
          details: details(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.');
        // إعادة تعيين النموذج
        setName('');
        setEmail('');
        setDetails('');
      } else {
        setError(result.error || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      }
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main class="flex-grow px-4 h-full">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark text-center">اطلب تطبيقك الخاص</h2>
        <p class="text-lg mb-8 text-center">
          صمم تطبيقًا مخصصًا يلبي احتياجاتك الخاصة. يرجى ملء النموذج أدناه وسنتواصل معك قريبًا لمناقشة التفاصيل.
        </p>
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">الاسم الكامل</label>
            <input
              type="text"
              value={name()}
              onInput={(e) => setName(e.target.value)}
              class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
              class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">تفاصيل الطلب</label>
            <textarea
              value={details()}
              onInput={(e) => setDetails(e.target.value)}
              class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent resize-none h-32"
              placeholder="أدخل تفاصيل التطبيق الذي ترغب في تصميمه..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class={`cursor-pointer w-full px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition duration-300 ease-in-out transform ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading()}
          >
            {loading() ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </button>
          <Show when={message()}>
            <p class="mt-4 text-green-600 text-center">{message()}</p>
          </Show>
          <Show when={error()}>
            <p class="mt-4 text-red-600 text-center">{error()}</p>
          </Show>
        </form>
      </div>
    </main>
  );
}

export default CustomAppRequest;