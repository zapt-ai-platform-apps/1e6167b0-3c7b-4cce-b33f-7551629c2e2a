import { createSignal } from 'solid-js';

function ShareApp() {
  const appTitle = 'Blind Accessibility';
  const appDescription = 'انطلق نحو الاستقلالية مع Blind Accessibility – كل ما تحتاجه في مكان واحد.';
  const [copySuccess, setCopySuccess] = createSignal('');
  const appLink = 'https://1e6167b0-3c7b-4cce-b33f-7551629c2e2a-6jxj2o55d.vercel.app/share';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appLink).then(() => {
      setCopySuccess('تم نسخ رابط التطبيق!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('حدث خطأ أثناء نسخ الرابط. يرجى المحاولة مرة أخرى.');
    });
  };

  // روابط المشاركة على وسائل التواصل الاجتماعي
  const shareText = encodeURIComponent(appDescription);
  const shareUrl = encodeURIComponent(appLink);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;
  const telegramShareUrl = `https://t.me/share/url?url=${shareUrl}&text=${shareText}`;

  return (
    <div class="flex flex-col items-center justify-center h-full px-4">
      <h1 class="text-4xl font-bold mb-4 text-primary-dark">{appTitle}</h1>
      <p class="text-lg mb-6 text-center">{appDescription}</p>
      <button
        class="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform mb-6"
        onClick={() => window.open(appLink, '_blank')}
      >
        تحميل التطبيق
      </button>
      <div class="max-w-2xl w-full">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">شارك التطبيق مع أصدقائك</h2>
        <p class="text-lg mb-6 text-center">
          يمكنك مشاركة التطبيق عبر وسائل التواصل الاجتماعي التالية:
        </p>
        <div class="flex space-x-4 space-x-reverse justify-center mb-6">
          <a
            href={facebookShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer transform hover:scale-105 transition duration-300"
          >
            <img src="/assets/facebook.svg" alt="فيسبوك" class="w-12 h-12" />
          </a>
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer transform hover:scale-105 transition duration-300"
          >
            <img src="/assets/twitter.svg" alt="تويتر" class="w-12 h-12" />
          </a>
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer transform hover:scale-105 transition duration-300"
          >
            <img src="/assets/whatsapp.svg" alt="واتساب" class="w-12 h-12" />
          </a>
          <a
            href={telegramShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer transform hover:scale-105 transition duration-300"
          >
            <img src="/assets/telegram.svg" alt="تليجرام" class="w-12 h-12" />
          </a>
        </div>
        <div class="text-center mb-4">
          <p class="text-lg mb-2">أو قم بنسخ رابط التطبيق ومشاركته:</p>
          <div class="flex items-center justify-center">
            <input
              type="text"
              value={appLink}
              readOnly
              class="w-full md:w-1/2 p-2 border border-gray-300 rounded-l-lg focus:outline-none box-border"
            />
            <button
              class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition duration-300 ease-in-out transform"
              onClick={handleCopyLink}
            >
              نسخ الرابط
            </button>
          </div>
          {copySuccess() && (
            <p class="text-green-600 mt-2">{copySuccess()}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShareApp;