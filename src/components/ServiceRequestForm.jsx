import { createSignal, Show, onMount } from 'solid-js';
import { supabase } from '../supabaseClient';

function ServiceRequestForm({ service, onClose }) {
  const [userName, setUserName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [details, setDetails] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');

  const fetchUserInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserName(user.user_metadata.full_name || '');
      setEmail(user.email);
    }
  };

  onMount(() => {
    fetchUserInfo();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading()) return;
    setLoading(true);
    setMessage('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
  
      const response = await fetch('/api/service-requests', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_name: service.name,
          user_name: userName(),
          user_email: email(),
          details: details(),
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage('تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.');
        setDetails('');
      } else {
        console.error('Error submitting request:', result.error);
        setMessage(result.error || 'حدث خطأ أثناء إرسال الطلب.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      setMessage('حدث خطأ أثناء إرسال الطلب.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          class="absolute top-2 left-2 text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer"
          onClick={onClose}
        >
          <svg class="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>إغلاق</title>
            <path d="M14.348 5.652a1 1 0 1 0-1.414-1.414L10 7.172 7.066 4.238a1 1 0 1 0-1.414 1.414L8.586 8.586l-2.934 2.934a1 1 0 1 0 1.414 1.414L10 10.828l2.934 2.934a1 1 0 1 0 1.414-1.414L11.414 8.586l2.934-2.934z" />
          </svg>
        </button>
        <h2 class="text-xl font-bold mb-4 text-primary-dark text-center">طلب خدمة: {service.name}</h2>
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">الإسم الكامل</label>
            <input
              type="text"
              value={userName()}
              onInput={(e) => setUserName(e.target.value)}
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
            <label class="block text-gray-700 font-semibold mb-2">تفاصيل إضافية</label>
            <textarea
              value={details()}
              onInput={(e) => setDetails(e.target.value)}
              class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent resize-none h-32"
              placeholder="أدخل أي تفاصيل إضافية..."
            ></textarea>
          </div>
          <button
            type="submit"
            class={`cursor-pointer px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform w-full ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading()}
          >
            {loading() ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </button>
          <Show when={message()}>
            <div class="mt-4 text-center text-green-600 font-semibold">
              {message()}
            </div>
          </Show>
        </form>
      </div>
    </div>
  );
}

export default ServiceRequestForm;