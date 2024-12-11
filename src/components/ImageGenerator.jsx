import { createSignal, Show } from 'solid-js';
import InputForm from './InputForm';
import GeneratedImage from './GeneratedImage';
import * as Sentry from "@sentry/browser";

function ImageGenerator() {
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [size, setSize] = createSignal('');
  const [generatedImage, setGeneratedImage] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const sizes = [
    '256x256',
    '512x512',
    '1024x1024',
  ];

  const handleGenerateImage = async () => {
    if (!description() || !size()) return;

    setLoading(true);
    setGeneratedImage('');

    const prompt = description();

    try {
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, size: size() }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedImage(data.imageUrl);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'حدث خطأ أثناء توليد الصورة.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      Sentry.captureException(error);
      alert('حدث خطأ أثناء توليد الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = () => {
    if (generatedImage()) {
      window.open(generatedImage(), '_blank');
    }
  };

  return (
    <div class="flex flex-col flex-grow items-center px-4 h-full">
      <div class="flex flex-col items-center mb-8">
        <h2 class="text-3xl font-bold text-purple-600 mb-4">منشئ الصور باستخدام الذكاء الاصطناعي</h2>
        <p class="text-lg text-center text-gray-700">أدخل وصفًا تفصيليًا للصورة واختر الحجم لتوليد صورة مخصصة</p>
      </div>
      <InputForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        size={size}
        setSize={setSize}
        sizes={sizes}
        handleGenerateImage={handleGenerateImage}
        loading={loading}
      />
      <Show when={generatedImage()}>
        <GeneratedImage
          generatedImage={generatedImage}
          title={title}
          handleDownloadImage={handleDownloadImage}
        />
      </Show>
    </div>
  );
}

export default ImageGenerator;