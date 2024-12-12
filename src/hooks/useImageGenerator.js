import { createSignal } from 'solid-js';
import * as Sentry from "@sentry/browser";

export function useImageGenerator() {
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [size, setSize] = createSignal('');
  const [style, setStyle] = createSignal('');
  const [numberOfImages, setNumberOfImages] = createSignal(1);
  const [generatedImages, setGeneratedImages] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const handleGenerateImage = async () => {
    if (!description() || !size()) return;

    setLoading(true);
    setGeneratedImages([]);

    // تطبيق النمط على الوصف
    let prompt = description();
    if (style()) {
      prompt = `${description()}, بأسلوب ${style()}`;
    }

    try {
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, size: size(), n: numberOfImages() }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedImages(data.imageUrls);
      } else {
        let errorMessage = 'حدث خطأ أثناء توليد الصورة.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          Sentry.captureException(parseError);
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      Sentry.captureException(error);
      alert('حدث خطأ أثناء توليد الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = (imageUrl) => {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    size,
    setSize,
    style,
    setStyle,
    numberOfImages,
    setNumberOfImages,
    generatedImages,
    loading,
    handleGenerateImage,
    handleDownloadImage,
  };
}