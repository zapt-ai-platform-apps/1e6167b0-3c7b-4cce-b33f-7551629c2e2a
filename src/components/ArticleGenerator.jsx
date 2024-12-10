import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';
import ContentGeneratorForm from './ContentGeneratorForm';
import GeneratedContent from './GeneratedContent';

function ArticleGenerator() {
  const [topic, setTopic] = createSignal('');
  const [contentType, setContentType] = createSignal('');
  const [generatedContent, setGeneratedContent] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const contentTypes = [
    'مقال',
    'منشور',
    'رسالة',
    'بحث',
    'تقرير',
    'مراسلة',
    'قصة',
  ];

  const handleGenerateContent = async () => {
    if (!topic() || !contentType()) return;

    setLoading(true);
    setGeneratedContent('');

    const prompt = `يرجى كتابة ${contentType()} شامل ومفصل حول الموضوع التالي: ${topic()}`;

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });

      setGeneratedContent(response);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('حدث خطأ أثناء توليد المحتوى. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow items-center px-4 h-full">
      <div class="flex flex-col items-center mb-8">
        <h2 class="text-3xl font-bold text-purple-600 mb-4">منشئ جميع أنواع المحتوى النصي</h2>
        <p class="text-lg text-center text-gray-700">أدخل الموضوع واختر نوع المحتوى لتوليد نص مخصص</p>
      </div>
      <ContentGeneratorForm
        topic={topic}
        setTopic={setTopic}
        contentType={contentType}
        setContentType={setContentType}
        contentTypes={contentTypes}
        handleGenerateContent={handleGenerateContent}
        loading={loading}
      />
      <GeneratedContent
        generatedContent={generatedContent}
        contentType={contentType}
      />
    </div>
  );
}

export default ArticleGenerator;