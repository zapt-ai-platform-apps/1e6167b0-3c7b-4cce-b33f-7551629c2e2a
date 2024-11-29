import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function ShareApp() {
  const navigate = useNavigate();
  const appTitle = 'Blind Accessibility';
  const appDescription = 'انطلق نحو الاستقلالية مع Blind Accessibility – كل ما تحتاجه في مكان واحد.';
  const [copySuccess, setCopySuccess] = createSignal('');
  const appLink = window.location.origin + '/share';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appLink).then(() => {
      setCopySuccess('تم نسخ رابط الصفحة!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('حدث خطأ أثناء نسخ الرابط. يرجى المحاولة مرة أخرى.');
    });
  };

  return (
    <div class="flex flex-col items-center justify-center h-full px-4">
      <h1 class="text-4xl font-bold mb-4 text-primary-dark">{appTitle}</h1>
      <p class="text-lg mb-6 text-center">{appDescription}</p>
      <button
        class="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform mb-6"
        onClick={() => window.open(window.location.origin, '_blank')}
      >
        تحميل التطبيق
      </button>
      <div class="max-w-2xl w-full">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">تفاصيل التطبيق</h2>
        <p class="text-lg mb-6">
          اكتشف مجموعة الخدمات والأدوات التي نقدمها لتعزيز استقلاليتك وتسهيل حياتك اليومية.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-2 text-primary-dark">خدماتنا</h3>
            <ul class="list-disc list-inside text-gray-700 space-y-2">
              <li>دورات تدريبية مجانية</li>
              {/* يمكنك إضافة المزيد من الخدمات هنا */}
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-2 text-primary-dark">أدواتنا</h3>
            <ul class="list-disc list-inside text-gray-700 space-y-2">
              <li>المساعد الذكي</li>
              <li>منشئ المحتوى النصي</li>
              <li>منشئ الصور بالذكاء الاصطناعي</li>
              {/* يمكنك إضافة المزيد من الأدوات هنا */}
            </ul>
          </div>
        </div>
      </div>
      <button
        class="cursor-pointer mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform"
        onClick={handleCopyLink}
      >
        نسخ رابط الصفحة
      </button>
      {copySuccess() && (
        <p class="text-green-600 mt-2">{copySuccess()}</p>
      )}
      <button
        class="cursor-pointer mt-4 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform"
        onClick={() => navigate(-1)}
      >
        الرجوع
      </button>
    </div>
  );
}

export default ShareApp;