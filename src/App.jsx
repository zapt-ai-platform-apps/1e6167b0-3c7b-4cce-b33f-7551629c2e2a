import { createSignal } from 'solid-js';

function App() {
  const [clicked, setClicked] = createSignal(false);

  const openWebsite = () => {
    if (!clicked()) {
      setClicked(true);
      window.open('https://www.blindaccess.pw', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-900" dir="rtl">
      <div class="mx-auto h-full w-full px-4 sm:px-6 lg:px-8">
        <header class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">Blind Accessibility</h1>
        </header>
        <main class="h-full">
          <p class="text-lg mb-4 font-semibold">
            انطلق نحو الاستقلالية مع <span class="font-bold">Blind Accessibility</span> – كل ما تحتاجه في مكان واحد
          </p>
          <p class="text-lg mb-8">
            استكشف ميزاتنا لتعزيز استقلاليتك وتواصلك مع الآخرين باستخدام حلول تقنية مبتكرة.
          </p>
          <button
            class={`cursor-pointer px-6 py-3 rounded-lg transition duration-300 ease-in-out transform box-border ${
              clicked()
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
            }`}
            onClick={openWebsite}
            disabled={clicked()}
          >
            زيارة موقعنا
          </button>
          <div class="mt-8">
            <h2 class="text-2xl font-bold mb-4 text-purple-600">تابعنا على وسائل التواصل الاجتماعي</h2>
            <div class="flex space-x-4 justify-center">
              <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                class="cursor-pointer transform hover:scale-105 transition duration-300"
              >
                <img src="/assets/facebook.svg" alt="فيسبوك" class="w-12 h-12" />
              </a>
              <a
                href="https://www.youtube.com/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                class="cursor-pointer transform hover:scale-105 transition duration-300"
              >
                <img src="/assets/youtube.svg" alt="يوتيوب" class="w-12 h-12" />
              </a>
              <a
                href="https://t.me/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                class="cursor-pointer transform hover:scale-105 transition duration-300"
              >
                <img src="/assets/telegram.svg" alt="تليجرام" class="w-12 h-12" />
              </a>
              <a
                href="https://wa.me/yournumber"
                target="_blank"
                rel="noopener noreferrer"
                class="cursor-pointer transform hover:scale-105 transition duration-300"
              >
                <img src="/assets/whatsapp.svg" alt="واتساب" class="w-12 h-12" />
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;