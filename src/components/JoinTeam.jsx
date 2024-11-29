import { createSignal, Show } from 'solid-js';

function JoinTeam() {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [successMessage, setSuccessMessage] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading()) return;

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/join-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name(),
          email: email(),
          message: message(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage(result.error || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error submitting join team request:', error);
      setErrorMessage('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main class="flex-grow px-4 h-full">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark text-center">انضم إلى فريقنا</h2>
        <p class="text-lg mb-8 text-center">
          هل ترغب في أن تكون جزءًا من فريقنا؟ أرسل لنا معلوماتك وسنتواصل معك قريبًا!
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
            <label class="block text-gray-700 font-semibold mb-2">رسالتك</label>
            <textarea
              value={message()}
              onInput={(e) => setMessage(e.target.value)}
              class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent resize-none h-32"
              placeholder="أخبرنا المزيد عن نفسك..."
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

export default JoinTeam;