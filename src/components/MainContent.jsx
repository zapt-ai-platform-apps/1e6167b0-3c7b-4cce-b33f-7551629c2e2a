import { createSignal } from 'solid-js';

function MainContent() {
  const [clicked, setClicked] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal('');

  const openWebsite = () => {
    if (!clicked()) {
      setClicked(true);
      window.open('https://www.blindaccess.pw', 'popup', 'width=800,height=600');
    }
  };

  const openBlog = () => {
    window.open('https://blindaccess.pw/المدونة/', '_blank', 'noopener,noreferrer');
  };

  const openForum = () => {
    window.open('https://blindaccess.pw/المنتدى/', '_blank', 'noopener,noreferrer');
  };

  const openStore = () => {
    window.open('https://blindaccess.pw/متجر/', '_blank', 'noopener,noreferrer');
  };

  const openJoinUs = () => {
    window.open('https://blindaccess.pw/انضم-للفريق/', '_blank', 'noopener,noreferrer');
  };

  const openFeedbackLink = () => {
    window.open('https://blindaccess.pw/ملاحظات-واقتراحات/', '_blank', 'noopener,noreferrer');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery().trim();
    if (query) {
      const searchUrl = `https://blindaccess.pw/?s=${encodeURIComponent(query)}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main class="h-full">
      <form onSubmit={handleSearch} class="mb-8">
        <div class="flex items-center">
          <input
            type="text"
            placeholder="ابحث هنا..."
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.target.value)}
            class="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-right"
          />
          <button
            type="submit"
            class="cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-l-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border"
          >
            بحث
          </button>
        </div>
      </form>
      <div class="text-center">
        <p class="text-lg mb-4 font-semibold">
          انطلق نحو الاستقلالية مع <span class="font-bold">Blind Accessibility</span> – كل ما تحتاجه في مكان واحد.
        </p>
        <p class="text-lg mb-8">
          استكشف ميزاتنا لتعزيز استقلاليتك وتواصلك مع الآخرين باستخدام حلول تقنية مبتكرة.
        </p>
      </div>
      <div class="flex flex-col md:flex-row md:flex-wrap md:justify-center md:space-x-4 md:space-x-reverse space-y-4 md:space-y-0">
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
        <button
          class="cursor-pointer px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition duration-300 ease-in-out transform box-border"
          onClick={openBlog}
        >
          زيارة المدونة
        </button>
        <button
          class="cursor-pointer px-6 py-3 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 hover:scale-105 transition duration-300 ease-in-out transform box-border"
          onClick={openForum}
        >
          زيارة المنتدى
        </button>
        <button
          class="cursor-pointer px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition duration-300 ease-in-out transform box-border"
          onClick={openStore}
        >
          زيارة المتجر
        </button>
      </div>

      <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">انضم لفريقنا</h2>
        <p class="text-lg mb-6">
          كن جزءًا من فريق <span class="font-bold">Blind Accessibility</span> وساهم في تحقيق المزيد من الاستقلالية للمكفوفين وضعاف البصر.
        </p>
        <button
          class="cursor-pointer px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border"
          onClick={openJoinUs}
        >
          انضم الآن
        </button>
      </div>

      <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">شاركنا ملاحظاتك واقتراحاتك</h2>
        <p class="text-lg mb-6">
          نود سماع آرائك لتحسين خدماتنا وتقديم الأفضل لك. تفضل بمشاركة ملاحظاتك واقتراحاتك.
        </p>
        <button
          class="cursor-pointer px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition duration-300 ease-in-out transform box-border"
          onClick={openFeedbackLink}
        >
          أرسل ملاحظاتك
        </button>
      </div>
    </main>
  );
}

export default MainContent;