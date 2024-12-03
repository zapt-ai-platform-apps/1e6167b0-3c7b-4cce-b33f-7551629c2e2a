import { createSignal, For, Show } from 'solid-js';

function ShareApp() {
  const appTitle = 'Blind Accessibility';
  const appDescription = 'انطلق نحو الاستقلالية مع Blind Accessibility – كل ما تحتاجه في مكان واحد.';
  const [copySuccess, setCopySuccess] = createSignal('');
  const appLink = 'https://1e6167b0-3c7b-4cce-b33f-7551629c2e2a.vercel.app';
  const appDownloadLink = 'https://archive.org/download/Blindaccess/Blindaccess.apk';
  const audioLink = 'https://archive.org/download/20241203_20241203_2054/%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%AA%D8%B7%D8%A8%D9%8A%D9%82.mp3';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appLink).then(
      () => {
        setCopySuccess('تم نسخ رابط التطبيق!');
        setTimeout(() => setCopySuccess(''), 2000);
      },
      () => {
        setCopySuccess('حدث خطأ أثناء نسخ الرابط. يرجى المحاولة مرة أخرى.');
      }
    );
  };

  // روابط المشاركة على وسائل التواصل الاجتماعي
  const shareText = encodeURIComponent(appDescription);
  const shareUrl = encodeURIComponent(appLink);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;
  const telegramShareUrl = `https://t.me/share/url?url=${shareUrl}&text=${shareText}`;

  const features = [
    'تجربة مستخدم محسنة للمكفوفين وضعاف البصر',
    'خدمات وأدوات متعددة في مكان واحد',
    'واجهة سهلة الاستخدام ومتوافقة مع قارئات الشاشة',
    'تحديثات مستمرة وميزات جديدة',
  ];

  return (
    <div class="flex flex-col min-h-screen">
      <header class="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-8">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold mb-4">{appTitle}</h1>
          <p class="text-xl">{appDescription}</p>
          <button
            class="cursor-pointer mt-6 px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => window.open(appDownloadLink, '_blank')}
          >
            تحميل التطبيق
          </button>
          <div class="mt-6">
            <audio
              controls
              class="w-full max-w-lg mx-auto"
            >
              <source src={audioLink} type="audio/mpeg" />
              متصفحك لا يدعم تشغيل الصوت. يرجى تحديث المتصفح أو استخدام متصفح آخر.
            </audio>
          </div>
        </div>
      </header>

      <main class="flex-grow bg-gray-100 py-8">
        <div class="container mx-auto px-4">
          <section class="mb-12">
            <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">
              لماذا {appTitle}؟
            </h2>
            <p class="text-lg text-center text-gray-700 mb-8">
              {appTitle} هو تطبيق مصمم خصيصًا للمكفوفين وضعاف البصر، يوفر مجموعة من
              الخدمات والأدوات في واجهة سهلة الاستخدام ومتوافقة مع قارئات الشاشة.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <For each={features}>
                {(feature) => (
                  <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <img
                      src="PLACEHOLDER"
                      alt={feature}
                      data-image-request={`Icon representing ${feature}`}
                      class="w-16 h-16 mx-auto mb-4"
                    />
                    <p class="text-center text-gray-800 font-semibold">{feature}</p>
                  </div>
                )}
              </For>
            </div>
          </section>

          <section class="text-center mb-12">
            <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">
              شارك التطبيق مع أصدقائك
            </h2>
            <p class="text-lg mb-6 text-center">
              ساعدنا في نشر الفائدة ومشاركة التطبيق مع الآخرين.
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
              <Show when={copySuccess()}>
                <p class="text-green-600 mt-2">{copySuccess()}</p>
              </Show>
            </div>
          </section>
        </div>
        <div class="mt-8 text-center text-gray-700">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline"
          >
            تم الإنشاء باستخدام ZAPT
          </a>
        </div>
      </main>
    </div>
  );
}

export default ShareApp;