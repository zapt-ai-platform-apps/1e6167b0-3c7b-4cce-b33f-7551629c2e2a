import { createSignal, onMount, Show, For } from 'solid-js';

function ForumManagement() {
  const [threads, setThreads] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [selectedThread, setSelectedThread] = createSignal(null);
  const [searchText, setSearchText] = createSignal('');

  // Mock functions to simulate API calls
  const fetchThreads = async () => {
    setLoading(true);
    // Replace with actual API call
    setTimeout(() => {
      setThreads([
        { id: 1, title: 'موضوع النقاش الأول' },
        { id: 2, title: 'موضوع النقاش الثاني' },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
  };

  const handleThreadDelete = async () => {
    const confirmation = confirm('هل أنت متأكد من حذف هذا الموضوع؟ لا يمكن التراجع عن هذه العملية.');
    if (!confirmation) return;

    // Implement delete logic here
    setThreads(threads().filter(thread => thread.id !== selectedThread().id));
    setSelectedThread(null);
    alert('تم حذف الموضوع بنجاح.');
  };

  onMount(() => {
    fetchThreads();
  });

  const filteredThreads = () => {
    return threads().filter(thread => thread.title.includes(searchText()));
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
          {/* يمكن إضافة المزيد من التفاصيل حسب الحاجة */}
          <div class="flex space-x-4 space-x-reverse mt-4">
            <button
              class="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform box-border"
              onClick={handleThreadDelete}
            >
              حذف الموضوع
            </button>
            <button
              class="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform box-border"
              onClick={() => setSelectedThread(null)}
            >
              إغلاق
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default ForumManagement;