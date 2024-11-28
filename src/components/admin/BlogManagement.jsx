import { createSignal, onMount, Show, For } from 'solid-js';

function BlogManagement() {
  const [posts, setPosts] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [selectedPost, setSelectedPost] = createSignal(null);
  const [searchText, setSearchText] = createSignal('');

  // Mock functions to simulate API calls
  const fetchPosts = async () => {
    setLoading(true);
    // Replace with actual API call
    setTimeout(() => {
      setPosts([
        { id: 1, title: 'عنوان المقال الأول', content: 'محتوى المقال الأول' },
        { id: 2, title: 'عنوان المقال الثاني', content: 'محتوى المقال الثاني' },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handlePostUpdate = async () => {
    // Implement update logic here
    alert('تم تحديث المقال بنجاح.');
  };

  const handlePostDelete = async () => {
    const confirmation = confirm('هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذه العملية.');
    if (!confirmation) return;

    // Implement delete logic here
    setPosts(posts().filter(post => post.id !== selectedPost().id));
    setSelectedPost(null);
    alert('تم حذف المقال بنجاح.');
  };

  const handlePostCreate = () => {
    setSelectedPost({ id: null, title: '', content: '' });
  };

  const handlePostSave = async () => {
    if (selectedPost().id) {
      // Update existing post
      handlePostUpdate();
    } else {
      // Create new post
      // Implement create logic here
      setPosts([...posts(), { ...selectedPost(), id: Date.now() }]);
      setSelectedPost(null);
      alert('تم إنشاء المقال بنجاح.');
    }
  };

  onMount(() => {
    fetchPosts();
  });

  const filteredPosts = () => {
    return posts().filter(post => post.title.includes(searchText()));
  };

  return (
    <div>
      <h3 class="text-xl font-bold mb-4 text-primary-dark">إدارة المدونة</h3>
      <div class="flex justify-between mb-4">
        <input
          type="text"
          value={searchText()}
          onInput={(e) => setSearchText(e.target.value)}
          placeholder="ابحث عن مقال..."
          class="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
        />
        <button
          class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform box-border"
          onClick={handlePostCreate}
        >
          إنشاء مقال جديد
        </button>
      </div>
      <Show when={!loading()} fallback={<p>جاري تحميل المقالات...</p>}>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={filteredPosts()}>
            {(post) => (
              <div
                class="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handlePostClick(post)}
              >
                <h4 class="font-semibold">{post.title}</h4>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Show when={selectedPost()}>
        <div class="mt-6 p-4 border border-gray-300 rounded-lg bg-white">
          <h4 class="text-lg font-bold mb-2">{selectedPost().id ? 'تعديل المقال' : 'إنشاء مقال جديد'}</h4>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-1">عنوان المقال</label>
              <input
                type="text"
                value={selectedPost().title}
                onInput={(e) => setSelectedPost({ ...selectedPost(), title: e.target.value })}
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-1">محتوى المقال</label>
              <textarea
                value={selectedPost().content}
                onInput={(e) => setSelectedPost({ ...selectedPost(), content: e.target.value })}
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border h-40 resize-none"
              ></textarea>
            </div>
            <div class="flex space-x-4 space-x-reverse">
              <button
                class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border"
                onClick={handlePostSave}
              >
                حفظ
              </button>
              <Show when={selectedPost().id}>
                <button
                  class="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform box-border"
                  onClick={handlePostDelete}
                >
                  حذف
                </button>
              </Show>
              <button
                class="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform box-border"
                onClick={() => setSelectedPost(null)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default BlogManagement;