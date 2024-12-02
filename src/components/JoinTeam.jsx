import { createSignal, Show } from 'solid-js';

function JoinTeam() {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [accepted, setAccepted] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [successMessage, setSuccessMessage] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading()) return;

    if (!accepted()) {
      setErrorMessage('يجب أن توافق على الشروط والمتطلبات للمتابعة.');
      return;
    }

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
        setAccepted(false);
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
        <h2 class="text-2xl font-bold mb-4 text-primary-dark text-center">انضم إلى فريقنا المتميز!</h2>
        <p class="text-lg mb-8 text-center">
          كن جزءًا من رحلتنا نحو النجاح والتميز. نحن نبحث عن الأشخاص الموهوبين والمتحمسين للانضمام إلى فريقنا الديناميكي.
        </p>
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-2 text-primary-dark">شروط ومتطلبات الانضمام:</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-2">
            <li>شغف بالعمل الجماعي والتعاون.</li>
            <li>مهارات تواصل ممتازة.</li>
            <li>القدرة على تقديم أفكار إبداعية.</li>
            <li>الالتزام بالأهداف والقيم الخاصة بفريقنا.</li>
          </ul>
        </div>
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
          <div class="flex items-center">
            <input
              type="checkbox"
              checked={accepted()}
              onInput={(e) => setAccepted(e.target.checked)}
              class="cursor-pointer h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 rounded mr-2"
              required
            />
            <label class="text-gray-700">
              أوافق على الشروط والمتطلبات المذكورة أعلاه.
            </label>
          </div>
          <button
            type="submit"
            class={`cursor-pointer w-full px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition duration-300 ease-in-out transform ${
              loading() || !accepted() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading() || !accepted()}
          >
            {loading() ? 'جاري الإرسال...' : 'انضم الآن'}
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