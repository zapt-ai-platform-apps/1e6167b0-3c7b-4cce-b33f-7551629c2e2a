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
    <main class="flex-grow px-4">
      <form onSubmit={handleSearch} class="mb-8">
        <div class="flex items-center">
          <input
            type="text"
            placeholder="ابحث هنا..."
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.target.value)}
            class="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border text-right"
          />
          <button
            type="submit"
            class="cursor-pointer px-6 py-3 bg-primary-dark text-white rounded-r-lg hover:bg-primary-dark hover:scale-105 transition duration-300 ease-in-out transform box-border"
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          class={`cursor-pointer px-6 py-3 rounded-lg transition duration-300 ease-in-out transform ${
            clicked()
              ? 'bg-secondary text-white cursor-not-allowed'
              : 'bg-primary-dark text-white hover:bg-primary-dark hover:scale-105'
          }`}
          onClick={openWebsite}
          disabled={clicked()}
        >
          زيارة موقعنا
        </button>
        <button
          class="cursor-pointer px-6 py-3 rounded-lg bg-secondary-dark text-white hover:bg-secondary-dark hover:scale-105 transition duration-300 ease-in-out transform"
          onClick={openBlog}
        >
          زيارة المدونة
        </button>
        <button
          class="cursor-pointer px-6 py-3 rounded-lg bg-secondary text-white hover:bg-secondary hover:scale-105 transition duration-300 ease-in-out transform"
          onClick={openForum}
        >
          زيارة المنتدى
        </button>
        <button
          class="cursor-pointer px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary hover:scale-105 transition duration-300 ease-in-out transform"
          onClick={openStore}
        >
          زيارة المتجر
        </button>
      </div>

      <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">انضم لفريقنا</h2>
        <p class="text-lg mb-6">
          كن جزءًا من فريق <span class="font-bold">Blind Accessibility</span> وساهم في تحقيق المزيد من الاستقلالية للمكفوفين وضعاف البصر.
        </p>
        <button
          class="cursor-pointer px-6 py-3 rounded-lg bg-primary-dark text-white hover:bg-primary-dark hover:scale-105 transition duration-300 ease-in-out transform"
          onClick={openJoinUs}
        >
          انضم الآن
        </button>
      </div>

      <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">شاركنا ملاحظاتك واقتراحاتك</h2>
        <p class="text-lg mb-6">
          نود سماع آرائك لتحسين خدماتنا وتقديم الأفضل لك. تفضل بمشاركة ملاحظاتك واقتراحاتك.
        </p>
        <button
          class="cursor-pointer px-6 py-3 rounded-lg bg-secondary-dark text-white hover:bg-secondary-dark hover:scale-105 transition duration-300 ease-in-out transform"
          onClick={openFeedbackLink}
        >
          أرسل ملاحظاتك
        </button>
      </div>
    </main>
  );
}

export default MainContent;