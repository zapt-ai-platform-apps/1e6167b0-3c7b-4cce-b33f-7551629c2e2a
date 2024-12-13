import { createSignal } from 'solid-js';
import ImageDescriptionForm from './ImageDescriptionForm';
import GeneratedDescription from './GeneratedDescription';

function ImageDescription() {
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [selectedImage, setSelectedImage] = createSignal(null);
  const [imagePreview, setImagePreview] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');
  const [generatedDescription, setGeneratedDescription] = createSignal('');

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <ImageDescriptionForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        setGeneratedDescription={setGeneratedDescription}
      />
      {error() && (
        <div class="mt-4 text-red-600 font-semibold text-center">{error()}</div>
      )}
      <GeneratedDescription generatedDescription={generatedDescription} />
    </div>
  );
}

export default ImageDescription;