import { supabase } from '../supabaseClient';
import ImageUploader from './ImageUploader';

function ImageDescriptionForm(props) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    selectedImage,
    setSelectedImage,
    imagePreview,
    setImagePreview,
    loading,
    setLoading,
    setError,
    setGeneratedDescription,
  } = props;

  let fileInputRef;

  const handleNext = async () => {
    if (!selectedImage()) {
      setError('يرجى اختيار صورة.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedDescription('');

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setError('يرجى تسجيل الدخول.');
        setLoading(false);
        return;
      }

      // Read image file as base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result.split(',')[1]; // Remove the data URL part

        const response = await fetch('/api/describeImage', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64Image }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'حدث خطأ أثناء معالجة الصورة.');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setGeneratedDescription(data.description);
        setLoading(false);
      };

      reader.onerror = (error) => {
        console.error('Error reading image file:', error);
        setError('حدث خطأ أثناء قراءة ملف الصورة.');
        setLoading(false);
      };

      reader.readAsDataURL(selectedImage());
    } catch (error) {
      console.error('Error:', error);
      setError('حدث خطأ أثناء معالجة الصورة.');
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col items-center">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">أداة وصف الصورة</h2>
        <p class="text-lg text-center text-gray-700">
          قم بتحميل صورة للحصول على وصف دقيق ومفصل باستخدام الذكاء الاصطناعي
        </p>
      </div>
      <div class="mb-4 w-full max-w-md">
        <label class="block text-gray-700 font-semibold mb-2" for="title">
          العنوان
        </label>
        <input
          id="title"
          type="text"
          value={title()}
          onInput={(e) => setTitle(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          placeholder="أدخل عنوانًا للصورة (اختياري)"
        />
      </div>
      <div class="mb-4 w-full max-w-md">
        <label class="block text-gray-700 font-semibold mb-2" for="description">
          الوصف
        </label>
        <textarea
          id="description"
          value={description()}
          onInput={(e) => setDescription(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none h-24"
          placeholder="أدخل وصفًا للصورة (اختياري)"
        ></textarea>
      </div>
      <ImageUploader
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        fileInputRef={fileInputRef}
        setGeneratedDescription={setGeneratedDescription}
        setError={setError}
      />
      <button
        class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform ${
          loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleNext}
        disabled={loading()}
      >
        {loading() ? 'جاري معالجة الصورة...' : 'التالي'}
      </button>
    </div>
  );
}

export default ImageDescriptionForm;