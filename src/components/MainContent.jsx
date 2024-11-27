import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function MainContent() {
  const [clicked, setClicked] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedOption, setSelectedOption] = createSignal('');
  const navigate = useNavigate();

  const openWebsite = () => {
    if (!clicked()) {
      setClicked(true);
      window.open('https://www.blindaccess.pw', 'popup', 'width=800,height=600');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery().trim();
    if (query) {
      const searchUrl = `https://blindaccess.pw/?s=${encodeURIComponent(query)}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (value) {
      navigate(`/${value}`);
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
            class="cursor-pointer px-6 py-3 bg-primary-dark text-white rounded-r-lg hover:scale-105 transition duration-300 ease-in-out transform box-border"
          >
            بحث
          </button>
        </div>
      </form>
      <div class="mb-8 flex justify-center">
        <select
          value={selectedOption()}
          onInput={handleSelectionChange}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
        >
          <option value="">اختر...</option>
          <option value="blog">المدونة</option>
          <option value="store">المتجر</option>
          <option value="forum">المنتدى</option>
        </select>
      </div>
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
          class={`cursor-pointer px-6 py-3 rounded-lg transition duration-300 ease-in-out transform box-border ${
            clicked()
              ? 'bg-secondary text-white cursor-not-allowed'
              : 'bg-primary-dark text-white hover:scale-105'
          }`}
          onClick={openWebsite}
          disabled={clicked()}
        >
          زيارة موقعنا
        </button>
      </div>
    </main>
  );
}

export default MainContent;