import { createSignal, Show, For } from 'solid-js';

function AIWebsiteBuilder() {
  const [siteName, setSiteName] = createSignal('');
  const [siteDescription, setSiteDescription] = createSignal('');
  const [siteType, setSiteType] = createSignal('');
  const [preferredColors, setPreferredColors] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const siteTypes = [
    'مدونة',
    'متجر إلكتروني',
    'موقع شخصي',
    'صفحة هبوط',
  ];

  const handleGenerateSite = async () => {
    if (!siteName() || !siteDescription() || !siteType()) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/generateWebsite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siteName: siteName(),
          siteDescription: siteDescription(),
          siteType: siteType(),
          preferredColors: preferredColors(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'حدث خطأ أثناء توليد الموقع.');
        setLoading(false);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${siteName().replace(/\s+/g, '_') || 'website'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
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
        <h2 class="text-2xl font-bold text-purple-600 mb-2">منشئ مواقع احترافي باستخدام الذكاء الاصطناعي</h2>
        <p class="text-lg text-center text-gray-700">أدخل تفاصيل الموقع لإنشاء موقع ويب احترافي بسهولة</p>
      </div>
      <div class="flex flex-col mb-4 space-y-4">
        <input
          type="text"
          value={siteName()}
          onInput={(e) => setSiteName(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="اسم الموقع"
        />
        <textarea
          value={siteDescription()}
          onInput={(e) => setSiteDescription(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-32"
          placeholder="وصف موجز للموقع..."
        ></textarea>
        <select
          value={siteType()}
          onInput={(e) => setSiteType(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
        >
          <option value="">اختر نوع الموقع</option>
          <For each={siteTypes}>{(type) => (
            <option value={type}>{type}</option>
          )}</For>
        </select>
        <input
          type="text"
          value={preferredColors()}
          onInput={(e) => setPreferredColors(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="الألوان المفضلة (اختياري)"
        />
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleGenerateSite}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري التوليد...">
            إنشاء الموقع
          </Show>
        </button>
      </div>
    </div>
  );
}

export default AIWebsiteBuilder;