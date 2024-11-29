import { createSignal, For, Show } from 'solid-js';

function RateApp() {
  const [rating, setRating] = createSignal(0);
  const [feedback, setFeedback] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [successMessage, setSuccessMessage] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading()) return;

    if (rating() === 0) {
      setErrorMessage('يرجى اختيار تقييم من 1 إلى 5 نجوم.');
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/rate-app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: rating(),
          feedback: feedback(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('شكرًا لتقييمك! نقدر ملاحظاتك القيمة.');
        setRating(0);
        setFeedback('');
      } else {
        setErrorMessage(result.error || 'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      setErrorMessage('حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main class="flex-grow px-4 h-full">
      <div class="max-w-xl mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark text-center">تقييم التطبيق</h2>
        <p class="text-lg mb-6 text-center">
          نود معرفة رأيك في تطبيقنا. يرجى تقييم تجربتك ومشاركتنا ملاحظاتك.
        </p>
        <form onSubmit={handleSubmit} class="space-y-4">
          <div class="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <For each={[1, 2, 3, 4, 5]}>
              {(value) => (
                <svg
                  class={`w-10 h-10 cursor-pointer ${
                    rating() >= value ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  onClick={() => handleRatingClick(value)}
                >
                  <title>{`نجمة ${value}`}</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.203 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.268a1 1 0 00-.364 1.118l1.203 3.674c.3.921-.755 1.688-1.54 1.118l-3.124-2.268a1 1 0 00-1.176 0l-3.124 2.268c-.784.57-1.838-.197-1.539-1.118l1.203-3.674a1 1 0 00-.364-1.118L2.347 9.1c-.784-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.203-3.674z" />
                </svg>
              )}
            </For>
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">ملاحظاتك</label>
            <textarea
              value={feedback()}
              onInput={(e) => setFeedback(e.target.value)}
              class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent resize-none h-32"
              placeholder="شاركنا رأيك..."
            ></textarea>
          </div>
          <button
            type="submit"
            class={`cursor-pointer w-full px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition duration-300 ease-in-out transform ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading()}
          >
            {loading() ? 'جاري الإرسال...' : 'إرسال التقييم'}
          </button>
          <Show when={successMessage()}>
            <p class="mt-4 text-green-600 text-center">{successMessage()}</p>
          </Show>
          <Show when={errorMessage()}>
            <p class="mt-4 text-red-600 text-center">{errorMessage()}</p>
          </Show>
        </form>
      </div>
    </main>
  );
}

export default RateApp;