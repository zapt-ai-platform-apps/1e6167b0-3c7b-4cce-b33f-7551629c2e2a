import { createSignal, Show, For } from 'solid-js';

function AIWebsiteBuilder() {
  const [siteName, setSiteName] = createSignal('');
  const [siteDescription, setSiteDescription] = createSignal('');
  const [siteType, setSiteType] = createSignal('');
  const [preferredColors, setPreferredColors] = createSignal('');
  const [errors, setErrors] = createSignal({});
  const [loading, setLoading] = createSignal(false);

  const siteTypes = [
    { value: 'مدونة', label: 'مدونة (Blog)' },
    { value: 'متجر إلكتروني', label: 'متجر إلكتروني (E-commerce Store)' },
    { value: 'موقع شخصي', label: 'موقع شخصي (Personal Website)' },
    { value: 'صفحة هبوط', label: 'صفحة هبوط (Landing Page)' },
  ];

  const handleGenerateSite = async () => {
    // Reset errors
    setErrors({});

    // Validate fields
    let currentErrors = {};
    if (!siteName()) {
      currentErrors.siteName = 'يرجى إدخال اسم الموقع.';
    }
    if (!siteDescription()) {
      currentErrors.siteDescription = 'يرجى إدخال وصف الموقع.';
    }
    if (!siteType()) {
      currentErrors.siteType = 'يرجى اختيار نوع الموقع.';
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
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
      <div class="flex flex-col items-center mb-8">
        <h2 class="text-3xl font-bold text-primary-dark mb-4">منشئ مواقع احترافي باستخدام الذكاء الاصطناعي</h2>
        <p class="text-lg text-center text-gray-700">أدخل تفاصيل الموقع لإنشاء موقع ويب احترافي بسهولة</p>
      </div>
      <form class="w-full max-w-lg mx-auto space-y-6" onSubmit={(e) => { e.preventDefault(); handleGenerateSite(); }}>
        <div>
          <label class="block text-gray-700 font-semibold mb-2" for="siteName">
            اسم الموقع<span class="text-red-500">*</span>
          </label>
          <input
            id="siteName"
            type="text"
            value={siteName()}
            onInput={(e) => setSiteName(e.target.value)}
            class={`block w-full p-3 border ${errors().siteName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border`}
            placeholder="أدخل اسم الموقع"
          />
          <Show when={errors().siteName}>
            <p class="text-red-500 text-sm mt-1">{errors().siteName}</p>
          </Show>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2" for="siteDescription">
            وصف الموقع<span class="text-red-500">*</span>
          </label>
          <textarea
            id="siteDescription"
            value={siteDescription()}
            onInput={(e) => setSiteDescription(e.target.value)}
            class={`block w-full p-3 border ${errors().siteDescription ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border resize-none h-32`}
            placeholder="أدخل وصفًا موجزًا للموقع..."
          ></textarea>
          <Show when={errors().siteDescription}>
            <p class="text-red-500 text-sm mt-1">{errors().siteDescription}</p>
          </Show>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2" for="siteType">
            نوع الموقع<span class="text-red-500">*</span>
          </label>
          <select
            id="siteType"
            value={siteType()}
            onInput={(e) => setSiteType(e.target.value)}
            class={`block w-full p-3 border ${errors().siteType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border cursor-pointer`}
          >
            <option value="">اختر نوع الموقع</option>
            <For each={siteTypes}>{(type) => (
              <option value={type.value}>{type.label}</option>
            )}</For>
          </select>
          <Show when={errors().siteType}>
            <p class="text-red-500 text-sm mt-1">{errors().siteType}</p>
          </Show>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2" for="preferredColors">
            الألوان المفضلة
          </label>
          <input
            id="preferredColors"
            type="text"
            value={preferredColors()}
            onInput={(e) => setPreferredColors(e.target.value)}
            class="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
            placeholder="أدخل الألوان المفضلة (اختياري)"
          />
          <p class="text-gray-500 text-sm mt-1">يمكنك تحديد ألوان مفضلة مثل "أزرق، أخضر، بنفسجي"</p>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class={`cursor-pointer inline-flex items-center px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-primary transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            disabled={loading()}
          >
            <Show when={!loading()} fallback={<span>جاري التوليد...</span>}>
              إنشاء الموقع
            </Show>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AIWebsiteBuilder;