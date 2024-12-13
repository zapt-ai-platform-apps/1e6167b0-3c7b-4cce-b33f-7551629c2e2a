import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import AdvertisementBanner from './AdvertisementBanner';

function MainContent() {
  const [selectedOption, setSelectedOption] = createSignal('');
  const navigate = useNavigate();

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (value === 'blog') {
      window.open('https://blindaccessibility0.blogspot.com/', '_blank', 'noopener,noreferrer');
    } else if (value) {
      navigate(`/${value}`);
    }
  };

  return (
    <main class="flex-grow px-4 h-full text-neutral-dark">
      <div class="text-center">
        <p class="text-lg mb-4 font-semibold">
          انطلق نحو الاستقلالية مع <span class="font-bold">Blind Accessibility</span> – كل ما تحتاجه في مكان واحد.
        </p>
      </div>
      <div class="mb-8 flex justify-center">
        <select
          value={selectedOption()}
          onInput={handleSelectionChange}
          class="box-border p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
        >
          <option value="">اختر وجهتك...</option>
          <option value="important-apps">أهم التطبيقات</option>
          <option value="blog">المدونة</option>
        </select>
      </div>
      <AdvertisementBanner />
    </main>
  );
}

export default MainContent;