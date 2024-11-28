import { createSignal, onMount, Show } from 'solid-js';
import { supabase } from '../supabaseClient';
import { useParams, useNavigate } from '@solidjs/router';

function BlogPost() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');

  const fetchPost = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        setError('حدث خطأ أثناء جلب المقال.');
      } else {
        setPost(data);
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('حدث خطأ أثناء جلب المقال.');
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchPost();
  });

  return (
    <main class="flex-grow px-4">
      <Show when={!loading()} fallback={<p>جاري تحميل المقال...</p>}>
        <Show when={!error()} fallback={<p class="text-red-600">{error()}</p>}>
          <Show when={post()}>
            <div class="max-w-3xl mx-auto">
              <h1 class="text-3xl font-bold mb-4 text-primary-dark">{post().title}</h1>
              <p class="text-sm text-gray-600 mb-2">التصنيف: {post().category}</p>
              <div class="text-gray-800 whitespace-pre-wrap">{post().content}</div>
            </div>
          </Show>
          <Show when={!post()}>
            <p>المقال غير موجود.</p>
          </Show>
        </Show>
      </Show>
      <button
        class="cursor-pointer px-4 py-2 mt-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border"
        onClick={() => navigate(-1)}
      >
        الرجوع
      </button>
    </main>
  );
}

export default BlogPost;