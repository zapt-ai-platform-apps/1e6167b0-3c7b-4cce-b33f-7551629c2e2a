import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';

function WebsiteBuilder(props) {
  const navigate = useNavigate();
  const [siteTitle, setSiteTitle] = createSignal('');
  const [siteDescription, setSiteDescription] = createSignal('');
  const [siteType, setSiteType] = createSignal('');
  const [detailedDescription, setDetailedDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const siteTypes = [
    'موقع شخصي',
    'مدونة',
    'موقع تجاري',
    'موقع إخباري',
    'موقع محفظة أعمال',
    'موقع تعليمي',
  ];

  const handleGenerateSite = async () => {
    if (!siteTitle() || !siteDescription() || !siteType() || !detailedDescription()) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    if (loading()) return;
    setLoading(true);
    props.setGeneratedSite('');

    const prompt = `يرجى إنشاء كود HTML لموقع ${siteType()} بعنوان "${siteTitle()}" ووصف "${siteDescription()}".
يجب أن يكون الموقع احترافي المظهر ويحتوي على العناصر التالية:
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
      <div class="flex flex-col mb-4 space-y-4">
        <div>
          <label class="block text-gray-700 font-semibold mb-2">عنوان الموقع</label>
          <input
            type="text"
            value={siteTitle()}
            onInput={(e) => setSiteTitle(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            placeholder="أدخل عنوان الموقع"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">وصف الموقع</label>
          <input
            type="text"
            value={siteDescription()}
            onInput={(e) => setSiteDescription(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            placeholder="أدخل وصف الموقع"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">نوع الموقع</label>
          <select
            value={siteType()}
            onInput={(e) => setSiteType(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
          >
            <option value="">اختر نوع الموقع</option>
            {siteTypes.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">وصف تفصيلي للموقع</label>
          <textarea
            value={detailedDescription()}
            onInput={(e) => setDetailedDescription(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-32"
            placeholder="أدخل وصفًا تفصيليًا للموقع والعناصر التي ترغب في تضمينها"
          ></textarea>
        </div>
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border mt-4 ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleGenerateSite}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري التوليد...">
            إنشاء
          </Show>
        </button>
      </div>
    </div>
  );
}

export default WebsiteBuilder;