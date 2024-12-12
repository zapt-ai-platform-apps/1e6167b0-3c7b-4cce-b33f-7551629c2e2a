import { Show } from 'solid-js';
import InputForm from './InputForm';
import GeneratedImage from './GeneratedImage';
import { useImageGenerator } from '../hooks/useImageGenerator';
import { sizes, styles } from '../constants';

function ImageGenerator() {
  const {
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
  } = useImageGenerator();

  return (
    <div class="flex flex-col flex-grow items-center px-4 h-full">
      <div class="flex flex-col items-center mb-8">
        <h2 class="text-3xl font-bold text-purple-600 mb-4">
          منشئ الصور باستخدام الذكاء الاصطناعي
        </h2>
        <p class="text-lg text-center text-gray-700">
          أدخل وصفًا تفصيليًا للصورة واختر الحجم والنمط لتوليد صورة مخصصة
        </p>
      </div>
      <InputForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        size={size}
        setSize={setSize}
        sizes={sizes}
        style={style}
        setStyle={setStyle}
        styles={styles}
        numberOfImages={numberOfImages}
        setNumberOfImages={setNumberOfImages}
        handleGenerateImage={handleGenerateImage}
        loading={loading}
      />
      <Show when={generatedImages().length > 0}>
        <GeneratedImage
          generatedImages={generatedImages}
          title={title}
          handleDownloadImage={handleDownloadImage}
        />
      </Show>
    </div>
  );
}

export default ImageGenerator;