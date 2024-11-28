import { createSignal, onMount, Show, For } from 'solid-js';
import { supabase } from '../../supabaseClient';

function BlogManagement() {
  const [posts, setPosts] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [selectedPost, setSelectedPost] = createSignal(null);
  const [searchText, setSearchText] = createSignal('');
  const [message, setMessage] = createSignal('');

  const categories = [
    'أخبار ومستجدات',
    'التطوير والبرمجة',
    'العمل والربح من الأنترنت',
    'تطبيقات وبرامج',
  ];

  const fetchPosts = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        setMessage('حدث خطأ أثناء جلب المقالات.');
      } else {
        setPosts(data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setMessage('حدث خطأ أثناء جلب المقالات.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setMessage('');
  };

  const handlePostUpdate = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: selectedPost().title,
          description: selectedPost().description,
          content: selectedPost().content,
          category: selectedPost().category,
        })
        .eq('id', selectedPost().id);

      if (error) {
        console.error('Error updating post:', error);
        setMessage('حدث خطأ أثناء تحديث المقال.');
      } else {
        setMessage('تم تحديث المقال بنجاح.');
        fetchPosts();
        setSelectedPost(null);
      }
    } catch (err) {
      console.error('Error updating post:', err);
      setMessage('حدث خطأ أثناء تحديث المقال.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostDelete = async () => {
    const confirmation = confirm('هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذه العملية.');
    if (!confirmation) return;

    setLoading(true);
    setMessage('');
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', selectedPost().id);

      if (error) {
        console.error('Error deleting post:', error);
        setMessage('حدث خطأ أثناء حذف المقال.');
      } else {
        setMessage('تم حذف المقال بنجاح.');
        fetchPosts();
        setSelectedPost(null);
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      setMessage('حدث خطأ أثناء حذف المقال.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreate = () => {
    setSelectedPost({ id: null, title: '', description: '', content: '', category: categories[0] });
    setMessage('');
  };

  const handlePostSave = async () => {
    if (!selectedPost().title || !selectedPost().content || !selectedPost().category) {
      setMessage('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    if (selectedPost().id) {
      // Update existing post
      await handlePostUpdate();
    } else {
      // Create new post
      setLoading(true);
      setMessage('');
      try {
        const { error } = await supabase
          .from('posts')
          .insert([
            {
              title: selectedPost().title,
              description: selectedPost().description,
              content: selectedPost().content,
              category: selectedPost().category,
              created_at: new Date(),
            },
          ]);

        if (error) {
          console.error('Error creating post:', error);
          setMessage('حدث خطأ أثناء إنشاء المقال.');
        } else {
          setMessage('تم إنشاء المقال بنجاح.');
          fetchPosts();
          setSelectedPost(null);
        }
      } catch (err) {
        console.error('Error creating post:', err);
        setMessage('حدث خطأ أثناء إنشاء المقال.');
      } finally {
        setLoading(false);
      }
    }
  };

  onMount(() => {
    fetchPosts();
  });

  const filteredPosts = () => {
    return posts().filter((post) =>
      post.title.includes(searchText()) || post.category.includes(searchText())
    );
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
                <p class="text-sm text-gray-600">{post.category}</p>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Show when={selectedPost()}>
        <div class="mt-6 p-4 border border-gray-300 rounded-lg bg-white">
          <h4 class="text-lg font-bold mb-2">
            {selectedPost().id ? 'تعديل المقال' : 'إنشاء مقال جديد'}
          </h4>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-1">عنوان المقال</label>
              <input
                type="text"
                value={selectedPost().title}
                onInput={(e) =>
                  setSelectedPost({ ...selectedPost(), title: e.target.value })
                }
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-1">وصف قصير</label>
              <textarea
                value={selectedPost().description}
                onInput={(e) =>
                  setSelectedPost({ ...selectedPost(), description: e.target.value })
                }
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border h-24 resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-1">محتوى المقال</label>
              <textarea
                value={selectedPost().content}
                onInput={(e) =>
                  setSelectedPost({ ...selectedPost(), content: e.target.value })
                }
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border h-40 resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-1">التصنيف</label>
              <select
                value={selectedPost().category}
                onInput={(e) =>
                  setSelectedPost({ ...selectedPost(), category: e.target.value })
                }
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border cursor-pointer"
              >
                <For each={categories}>
                  {(category) => (
                    <option value={category}>{category}</option>
                  )}
                </For>
              </select>
            </div>
            <div class="flex space-x-4 space-x-reverse">
              <button
                class={`cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border ${
                  loading() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handlePostSave}
                disabled={loading()}
              >
                {loading() ? 'جاري الحفظ...' : 'حفظ'}
              </button>
              <Show when={selectedPost().id}>
                <button
                  class={`cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform box-border ${
                    loading() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handlePostDelete}
                  disabled={loading()}
                >
                  {loading() ? 'جاري الحذف...' : 'حذف'}
                </button>
              </Show>
              <button
                class="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform box-border"
                onClick={() => {
                  setSelectedPost(null);
                  setMessage('');
                }}
              >
                إلغاء
              </button>
            </div>
            <Show when={message()}>
              <p class="mt-4 text-center text-green-600 font-semibold">{message()}</p>
            </Show>
          </div>
        </div>
      </Show>
      <Show when={message() && !selectedPost()}>
        <p class="mt-4 text-center text-green-600 font-semibold">{message()}</p>
      </Show>
    </div>
  );
}

export default BlogManagement;