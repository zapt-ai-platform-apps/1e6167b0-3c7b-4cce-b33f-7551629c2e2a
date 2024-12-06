import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';
import WebsiteBuilderForm from './WebsiteBuilderForm';
import { siteTypes } from '../constants/siteTypes';

function WebsiteBuilder(props) {
  const navigate = useNavigate();
  const [siteTitle, setSiteTitle] = createSignal('');
  const [siteDescription, setSiteDescription] = createSignal('');
  const [siteType, setSiteType] = createSignal('');
  const [detailedDescription, setDetailedDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleGenerateSite = async () => {
    if (!siteTitle() || !siteDescription() || !siteType() || !detailedDescription()) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    if (loading()) return;
    setLoading(true);
    props.setGeneratedSite('');

    const prompt = `يرجى إنشاء كود HTML لموقع ${siteType()} بعنوان "${siteTitle()}" ووصف "${siteDescription()}".
الموقع يجب أن يكون بمظهر احترافي ويحتوي على العناصر التالية:
${detailedDescription()}.
الرجاء تقديم الكود الكامل للموقع بلغات HTML و CSS و JavaScript مدمجة في ملف واحد.`;

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });

      if (response) {
        props.setGeneratedSite(response);
        navigate('/tools/website-builder/generated');
      } else {
        alert('حدث خطأ أثناء توليد الموقع.');
      }
    } catch (error) {
      console.error('Error generating site:', error);
      alert('حدث خطأ أثناء توليد الموقع. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow px-4 h-full">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">منشئ المواقع الذكي</h2>
        <p class="text-lg text-center text-gray-700">قم بتوليد موقع احترافي متكامل وبتنسيق ومظهر احترافي</p>
      </div>
      <WebsiteBuilderForm
        siteTitle={siteTitle}
        setSiteTitle={setSiteTitle}
        siteDescription={siteDescription}
        setSiteDescription={setSiteDescription}
        siteType={siteType}
        setSiteType={setSiteType}
        detailedDescription={detailedDescription}
        setDetailedDescription={setDetailedDescription}
        siteTypes={siteTypes}
        handleGenerateSite={handleGenerateSite}
        loading={loading}
      />
    </div>
  );
}

export default WebsiteBuilder;