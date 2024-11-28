import { createSignal, onMount, Show, For } from 'solid-js';
import { supabase } from '../../supabaseClient';

function ForumManagement() {
  const [threads, setThreads] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [selectedThread, setSelectedThread] = createSignal(null);
  const [searchText, setSearchText] = createSignal('');
  const [message, setMessage] = createSignal('');

  const fetchThreads = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase
        .from('threads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching threads:', error);
        setMessage('حدث خطأ أثناء جلب المواضيع.');
      } else {
        setThreads(data);
      }
    } catch (err) {
      console.error('Error fetching threads:', err);
      setMessage('حدث خطأ أثناء جلب المواضيع.');
    } finally {
      setLoading(false);
    }
  };

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
    setMessage('');
  };

  const handleThreadDelete = async () => {
    const confirmation = confirm('هل أنت متأكد من حذف هذا الموضوع؟ لا يمكن التراجع عن هذه العملية.');
    if (!confirmation) return;

    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase
        .from('threads')
        .delete()
        .eq('id', selectedThread().id);

      if (error) {
        console.error('Error deleting thread:', error);
        setMessage('حدث خطأ أثناء حذف الموضوع.');
      } else {
        setMessage('تم حذف الموضوع بنجاح.');
        fetchThreads();
        setSelectedThread(null);
      }
    } catch (err) {
      console.error('Error deleting thread:', err);
      setMessage('حدث خطأ أثناء حذف الموضوع.');
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchThreads();
  });

  const filteredThreads = () => {
    return threads().filter((thread) =>
      thread.title.includes(searchText())
    );
  };

  return (
    <div>
      <h3 class="text-xl font-bold mb-4 text-primary-dark">إدارة المنتدى</h3>
      <div class="mb-4">
        <input
          type="text"
          value={searchText()}
          onInput={(e) => setSearchText(e.target.value)}
          placeholder="ابحث عن موضوع..."
          class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
        />
      </div>
      <Show when={!loading()} fallback={<p>جاري تحميل المواضيع...</p>}>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={filteredThreads()}>
            {(thread) => (
              <div
                class="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleThreadClick(thread)}
              >
                <h4 class="font-semibold">{thread.title}</h4>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Show when={selectedThread()}>
        <div class="mt-6 p-4 border border-gray-300 rounded-lg bg-white">
          <h4 class="text-lg font-bold mb-2">تفاصيل الموضوع</h4>
          <p>عنوان الموضوع: {selectedThread().title}</p>
          <p>محتوى الموضوع: {selectedThread().content}</p>
          {/* يمكن إضافة المزيد من التفاصيل حسب الحاجة */}
          <div class="flex space-x-4 space-x-reverse mt-4">
            <button
              class={`cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform box-border ${
                loading() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleThreadDelete}
              disabled={loading()}
            >
              {loading() ? 'جاري الحذف...' : 'حذف الموضوع'}
            </button>
            <button
              class="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform box-border"
              onClick={() => {
                setSelectedThread(null);
                setMessage('');
              }}
            >
              إغلاق
            </button>
          </div>
          <Show when={message()}>
            <p class="mt-4 text-center text-green-600 font-semibold">{message()}</p>
          </Show>
        </div>
      </Show>
      <Show when={message() && !selectedThread()}>
        <p class="mt-4 text-center text-green-600 font-semibold">{message()}</p>
      </Show>
    </div>
  );
}

export default ForumManagement;