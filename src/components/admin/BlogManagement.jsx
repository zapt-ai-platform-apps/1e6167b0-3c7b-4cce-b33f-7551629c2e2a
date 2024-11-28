import { createSignal, onMount, Show, For } from 'solid-js';
import { supabase, createEvent } from '../../supabaseClient';

function BlogManagement() {
  const [posts, setPosts] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [selectedPost, setSelectedPost] = createSignal(null);
  const [searchText, setSearchText] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [generating, setGenerating] = createSignal(false);
  const [aiTopic, setAiTopic] = createSignal('');

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
    setAiTopic('');
  };

  const handlePostSave = async () => {
    if (!selectedPost().title || !selectedPost().content || !selectedPost().category) {
      setMessage('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    if (loading()) return;
    setLoading(true);
    setMessage('');

    try {
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch('/api/posts', {
        method: selectedPost().id ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedPost().id,
          title: selectedPost().title,
          description: selectedPost().description,
          content: selectedPost().content,
          category: selectedPost().category,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        fetchPosts();
        setSelectedPost(null);
      } else {
        console.error('Error saving post:', result.error);
        setMessage(result.error || 'حدث خطأ أثناء حفظ المقال.');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setMessage('حدث خطأ أثناء حفظ المقال.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostDelete = async () => {
    const confirmation = confirm('هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذه العملية.');
    if (!confirmation) return;

    if (loading()) return;
    setLoading(true);
    setMessage('');
    try {
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch('/api/posts', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedPost().id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        fetchPosts();
        setSelectedPost(null);
      } else {
        console.error('Error deleting post:', result.error);
        setMessage(result.error || 'حدث خطأ أثناء حذف المقال.');
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
    setAiTopic('');
  };

  const handleGenerateArticle = async () => {
    if (generating()) return;
    if (!aiTopic()) {
      setMessage('يرجى إدخال موضوع المقال.');
      return;
    }
    setGenerating(true);
    setMessage('');
    try {
      const prompt = `يرجى توليد مقال شامل ومفصل حول الموضوع التالي: \"${aiTopic()}\" وتقديمه بصيغة JSON بالهيكل التالي: { \"title\": \"عنوان المقال\", \"description\": \"وصف قصير للمقال\", \"content\": \"محتوى المقال\" }`;
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'json',
      });
      if (response && response.title && response.description && response.content) {
        setSelectedPost({
          ...selectedPost(),
          title: response.title,
          description: response.description,
          content: response.content,
        });
        setMessage('تم إنشاء المقال باستخدام الذكاء الاصطناعي. يرجى مراجعته وتعديله إذا لزم الأمر.');
      } else {
        setMessage('لم يتمكن الذكاء الاصطناعي من إنشاء المقال. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error generating article:', error);
      setMessage('حدث خطأ أثناء إنشاء المقال.');
    } finally {
      setGenerating(false);
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
            <div>
              <label class="block text-gray-700 font-semibold mb-1">موضوع المقال</label>
              <input
                type="text"
                value={aiTopic()}
                onInput={(e) => setAiTopic(e.target.value)}
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
                placeholder="أدخل موضوع المقال لتوليده بواسطة الذكاء الاصطناعي"
              />
            </div>
            <button
              class={`cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border ${
                generating() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleGenerateArticle}
              disabled={generating()}
            >
              {generating() ? 'جاري إنشاء المقال...' : 'إنشاء المقال باستخدام الذكاء الاصطناعي'}
            </button>
            <div class="flex space-x-4 space-x-reverse mt-4">
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
                  setAiTopic('');
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