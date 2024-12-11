import * as Sentry from "@sentry/node";

export async function fetchPosts(req, res, supabaseAdmin) {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'حدث خطأ أثناء جلب المقالات.' });
  }

  return res.status(200).json({ posts: data });
}

export async function createPost(req, res, supabaseAdmin) {
  const { title, description, content, category } = req.body;

  const { data, error } = await supabaseAdmin
    .from('posts')
    .insert([
      {
        title,
        description,
        content,
        category,
        created_at: new Date(),
      },
    ]);

  if (error) {
    console.error('Error creating post:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'حدث خطأ أثناء إنشاء المقال.' });
  }

  return res.status(200).json({ message: 'تم إنشاء المقال بنجاح.', post: data[0] });
}

export async function updatePost(req, res, supabaseAdmin) {
  const { id, title, description, content, category } = req.body;

  const { data, error } = await supabaseAdmin
    .from('posts')
    .update({
      title,
      description,
      content,
      category,
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating post:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'حدث خطأ أثناء تحديث المقال.' });
  }

  return res.status(200).json({ message: 'تم تحديث المقال بنجاح.', post: data[0] });
}

export async function deletePost(req, res, supabaseAdmin) {
  const { id } = req.body;

  const { error } = await supabaseAdmin
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'حدث خطأ أثناء حذف المقال.' });
  }

  return res.status(200).json({ message: 'تم حذف المقال بنجاح.' });
}