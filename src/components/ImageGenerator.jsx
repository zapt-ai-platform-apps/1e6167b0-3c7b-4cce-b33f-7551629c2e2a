import { createSignal, Show } from 'solid-js';
import InputForm from './InputForm';
import GeneratedImage from './GeneratedImage';
import { createEvent } from '../supabaseClient';

function ImageGenerator() {
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [size, setSize] = createSignal('');
  const [format, setFormat] = createSignal('');
  const [generatedImage, setGeneratedImage] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const sizes = [
    '256x256',
    '512x512',
    '1024x1024',
  ];

  const formats = [
    'PNG',
    'JPEG',
    'WEBP',
  ];

  const handleGenerateImage = async () => {
    if (!description() || !size() || !format()) return;

    setLoading(true);
    setGeneratedImage('');

    const prompt = `${description()} Size: ${size()}, Format: ${format().toLowerCase()}`;

    try {
      const response = await createEvent('generate_image', {
        prompt: prompt,
      });

      if (response) {
        setGeneratedImage(response);
      } else {
        alert('حدث خطأ أثناء توليد الصورة.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('حدث خطأ أثناء توليد الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = generatedImage();
    link.download = title() ? `${title()}.${format().toLowerCase()}` : `image.${format().toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div class="flex flex-col flex-grow items-center px-4 h-full">
      <div class="flex flex-col items-center mb-8">
        <h2 class="text-3xl font-bold text-purple-600 mb-4">منشئ الصور باستخدام الذكاء الاصطناعي</h2>
        <p class="text-lg text-center text-gray-700">أدخل وصفًا تفصيليًا للصورة واختر الحجم والصيغة لتوليد صورة مخصصة</p>
      </div>
      <InputForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        size={size}
        setSize={setSize}
        format={format}
        setFormat={setFormat}
        sizes={sizes}
        formats={formats}
        handleGenerateImage={handleGenerateImage}
        loading={loading}
      />
      <Show when={generatedImage()}>
        <GeneratedImage
          generatedImage={generatedImage}
          title={title}
          format={format}
          handleDownloadImage={handleDownloadImage}
        />
      </Show>
    </div>
  );
}

export default ImageGenerator;