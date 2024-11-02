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
            class={`px-6 py-3 rounded-lg transition duration-300 ease-in-out transform ${
              clicked()
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 cursor-pointer'
            }`}
            onClick={openWebsite}
            disabled={clicked()}
          >
            زيارة موقعنا
          </button>
        </main>
      </div>
    </div>
  );
}

export default App;