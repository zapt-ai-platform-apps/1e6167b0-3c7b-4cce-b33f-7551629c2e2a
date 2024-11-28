import { createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function AdvertisementBanner() {
  const [ad, setAd] = createSignal(null);
  const navigate = useNavigate();

  const ads = [
    {
      title: 'المساعد الذكي',
      description: 'تفاعل مع المساعد الذكي للحصول على إجابات سريعة ومساعدة فورية.',
      buttonText: 'جرب الآن',
      link: '/tools/chat-assistant',
    },
    {
      title: 'منشئ المحتوى النصي',
      description: 'أنشئ جميع أنواع المحتوى النصي بمساعدة الذكاء الاصطناعي.',
      buttonText: 'ابدأ الكتابة',
      link: '/tools/article-generator',
    },
    {
      title: 'الراديو العربي',
      description: 'استمع إلى المحطات الإذاعية العربية المفضلة لديك من مختلف البلدان.',
      buttonText: 'استمع الآن',
      link: '/tools/arabic-radio',
    },
    {
      title: 'منشئ الصور بالذكاء الاصطناعي',
      description: 'أنشئ صورًا باستخدام الذكاء الاصطناعي بناءً على وصفك.',
      buttonText: 'أنشئ صورة',
      link: '/tools/image-generator',
    },
    // يمكنك إضافة المزيد من الإعلانات هنا
  ];

  const getRandomAd = () => {
    const randomIndex = Math.floor(Math.random() * ads.length);
    setAd(ads[randomIndex]);
  };

  onMount(() => {
    getRandomAd();
  });

  const handleButtonClick = () => {
    navigate(ad().link);
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