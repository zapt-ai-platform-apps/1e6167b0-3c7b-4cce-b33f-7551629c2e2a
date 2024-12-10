import { createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import categories from '../data/categories';
import servicesCategories from '../data/servicesCategories';
import appsCategories from '../data/appsCategories';

function AdvertisementBanner() {
  const [ad, setAd] = createSignal(null);
  const navigate = useNavigate();

  const ads = [];

  // Add tools from categories
  categories.forEach(category => {
    category.tools.forEach(tool => {
      ads.push({
        title: tool.name,
        description: tool.description,
        buttonText: 'جرب الآن',
        link: tool.link || `/tools/${tool.name}`,
      });
    });
  });

  // Add services from servicesCategories
  servicesCategories.forEach(category => {
    category.services.forEach(service => {
      ads.push({
        title: service.name,
        description: service.description,
        buttonText: 'عرض الخدمة',
        link: service.link || `/services/${service.name}`,
      });
    });
  });

  // Add apps from appsCategories
  appsCategories.forEach(category => {
    category.apps.forEach(app => {
      ads.push({
        title: app.name,
        description: app.description,
        buttonText: 'تحميل التطبيق',
        link: app.downloadLink,
      });
    });
  });

  const getRandomAd = () => {
    const randomIndex = Math.floor(Math.random() * ads.length);
    setAd(ads[randomIndex]);
  };

  onMount(() => {
    getRandomAd();
  });

  const handleButtonClick = () => {
    if (ad().link.startsWith('http')) {
      window.open(ad().link, '_blank', 'noopener,noreferrer');
    } else {
      navigate(ad().link);
    }
  };

  return (
    <div class="bg-yellow-100 border border-yellow-400 text-yellow-800 p-6 rounded-lg mb-8">
      <h3 class="text-2xl font-bold mb-2">{ad()?.title}</h3>
      <p class="text-lg mb-4">{ad()?.description}</p>
      <button
        class="cursor-pointer px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleButtonClick}
      >
        {ad()?.buttonText}
      </button>
    </div>
  );
}

export default AdvertisementBanner;