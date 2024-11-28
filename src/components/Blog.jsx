import { createSignal, onMount, Show, For } from 'solid-js';
import { supabase } from '../supabaseClient';

function Blog() {
  const [posts, setPosts] = createSignal([]);
  const [selectedCategory, setSelectedCategory] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const categories = [
    'أخبار ومستجدات',
    'التطوير والبرمجة',
    'العمل والربح من الأنترنت',
    'تطبيقات وبرامج',
  ];

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (selectedCategory()) {
        query = query.eq('category', selectedCategory());
      }
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    fetchPosts();
  };

  onMount(() => {
    fetchPosts();
  });

  return (
    <main class="flex-grow px-4">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">المدونة</h2>
        <p class="text-lg mb-8">
          اقرأ أحدث المقالات في مختلف المجالات.
        </p>
      </div>
      <div class="mb-8 flex justify-center">
        <select
          value={selectedCategory()}
          onInput={handleCategoryChange}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
        >
          <option value="">كل التصنيفات</option>
          <For each={categories}>
            {(category) => (
              <option value={category}>{category}</option>
            )}
          </For>
        </select>
      </div>
      <Show when={!loading()} fallback={<p>جاري تحميل المقالات...</p>}>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <For each={posts()}>
            {(post) => (
              <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 class="text-xl font-bold mb-2 text-primary-dark">{post.title}</h3>
                <p class="text-sm text-gray-600 mb-2">{post.category}</p>
                <p class="text-gray-700">{post.description}</p>
              </div>
            )}
          </For>
        </div>
      </Show>
    </main>
  );
}

export default Blog;