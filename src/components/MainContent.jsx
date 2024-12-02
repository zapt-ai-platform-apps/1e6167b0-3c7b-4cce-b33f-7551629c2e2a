import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import AdvertisementBanner from './AdvertisementBanner';

function MainContent() {
  const [selectedOption, setSelectedOption] = createSignal('');
  const navigate = useNavigate();

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (value) {
      navigate(`/${value}`);
    }
  };

  return (
    <main class="flex-grow px-4 h-full">
      <div class="text-center">
        <p class="text-lg mb-4 font-semibold">
          انطلق نحو الاستقلالية مع <span class="font-bold">Blind Accessibility</span> – كل ما تحتاجه في مكان واحد.
        </p>
        <p class="text-lg mb-8">
          استكشف ميزاتنا لتعزيز استقلاليتك وتواصلك مع الآخرين باستخدام حلول تقنية مبتكرة.
        </p>
        <p class="text-xl font-semibold mb-6 text-purple-600">
          انضم إلينا في رحلتنا نحو التميز وساهم في صنع الفرق!
        </p>
        <button
          class="cursor-pointer px-6 py-3 mb-8 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border"
          onClick={() => navigate('/join-team')}
        >
          انضم للفريق
        </button>
      </div>
      <div class="mb-8 flex justify-center">
        <select
          value={selectedOption()}
          onInput={handleSelectionChange}
          class="box-border p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
        >
          <option value="">اختر وجهتك...</option>
          <option value="services">الخدمات</option>
          <option value="tools">الأدوات</option>
          <option value="join-team">انضم للفريق</option>
          <option value="rate-app">تقييم التطبيق</option>
        </select>
      </div>
      <div class="mb-8 flex justify-center">
        <button
          class="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform box-border"
          onClick={() => navigate('/share')}
        >
          شارك التطبيق
        </button>
      </div>
      <AdvertisementBanner />
    </main>
  );
}

export default MainContent;