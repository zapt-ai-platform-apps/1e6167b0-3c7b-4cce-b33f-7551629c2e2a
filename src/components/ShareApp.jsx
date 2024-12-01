import { createSignal, For } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function ShareApp() {
  const appTitle = 'Blind Accessibility';
  const appDescription = 'انطلق نحو الاستقلالية مع Blind Accessibility – كل ما تحتاجه في مكان واحد.';
  const [copySuccess, setCopySuccess] = createSignal('');
  const appLink = 'https://1e6167b0-3c7b-4cce-b33f-7551629c2e2a-6jxj2o55d.vercel.app/share';
  const navigate = useNavigate();

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

  const features = [
    'تجربة مستخدم محسنة للمكفوفين وضعاف البصر',
    'خدمات وأدوات متعددة في مكان واحد',
    'واجهة سهلة الاستخدام ومتوافقة مع قارئات الشاشة',
    'تحديثات مستمرة وميزات جديدة',
  ];

  const testimonials = [
    {
      name: 'أحمد علي',
      feedback: 'تطبيق رائع! ساعدني كثيرًا في حياتي اليومية.',
    },
    {
      name: 'سارة محمد',
      feedback: 'أفضل تطبيق للمكفوفين قمت بتجربته. واجهة سهلة وخدمات مفيدة جدًا.',
    },
  ];

  return (
    <div class="flex flex-col min-h-screen">
      <header class="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-8">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold mb-4">{appTitle}</h1>
          <p class="text-xl">{appDescription}</p>
          <button
            class="cursor-pointer mt-6 px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => window.open(appLink, '_blank')}
          >
            تحميل التطبيق
          </button>
        </div>
      </header>

      <main class="flex-grow bg-gray-100 py-8">
        <div class="container mx-auto px-4">
          <section class="mb-12">
            <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">لماذا Blind Accessibility؟</h2>
            <p class="text-lg text-center text-gray-700 mb-8">
              {appTitle} هو تطبيق مصمم خصيصًا للمكفوفين وضعاف البصر، يوفر مجموعة من الخدمات والأدوات في واجهة سهلة الاستخدام ومتوافقة مع قارئات الشاشة.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <>
                <For each={features}>{(feature) => (
                  <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <img src="https://images.unsplash.com/photo-1632505084039-f8ec4b00e432?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwzfHxTY3JlZW5zaG90JTIwb2YlMjB0aGUlMjBhcHAlMjBob21lJTIwc2NyZWVufGVufDB8fHx8MTczMzA3MjEzNHww&ixlib=rb-4.0.3&q=80&w=1080"  alt={feature} data-image-request={`Icon representing ${feature}`} class="w-16 h-16 mx-auto mb-4" />
                  </div>
                )}</For>
                <img src="https://images.unsplash.com/photo-1521931961826-fe48677230a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwyfHxTY3JlZW5zaG90JTIwb2YlMjB0aGUlMjBhcHAlMjB0b29scyUyMHNlY3Rpb258ZW58MHx8fHwxNzMzMDcyMTM0fDA&ixlib=rb-4.0.3&q=80&w=1080"  alt="لقطة شاشة للتطبيق" data-image-request="Screenshot of the app tools section" class="w-full rounded-lg shadow-md" />
                <img src="https://images.unsplash.com/photo-1620680779930-e74c15c8f7a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw5fHxTY3JlZW5zaG90JTIwb2YlMjB0aGUlMjBhcHAlMjBzZXJ2aWNlcyUyMHNlY3Rpb258ZW58MHx8fHwxNzMzMDcyMTM0fDA&ixlib=rb-4.0.3&q=80&w=1080"  alt="لقطة شاشة للتطبيق" data-image-request="Screenshot of the app services section" class="w-full rounded-lg shadow-md" />
              </>
            </div>
          </section>

          <section class="mb-12">
            <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">ماذا يقول مستخدمونا</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <For each={testimonials}>{(testimonial) => (
                <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                  <p class="text-gray-800 italic mb-4">"{testimonial.feedback}"</p>
                  <p class="text-gray-700 font-semibold text-right">- {testimonial.name}</p>
                </div>
              )}</For>
            </div>
          </section>

          <section class="text-center mb-12">
            <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">شارك التطبيق مع أصدقائك</h2>
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
              {copySuccess() && (
                <p class="text-green-600 mt-2">{copySuccess()}</p>
              )}
            </div>
          </section>

          <section class="text-center">
            <button
              class="cursor-pointer mt-6 px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate('/')}
            >
              الرجوع إلى الرئيسية
            </button>
          </section>
        </div>
      </main>

      <footer class="bg-gray-200 text-center py-4">
        <p>جميع الحقوق محفوظة © 2023 {appTitle}</p>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline"
        >
          تم الإنشاء باستخدام ZAPT
        </a>
      </footer>
    </div>
  );
}

export default ShareApp;