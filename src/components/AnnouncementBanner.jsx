import { createSignal, onMount, Show } from 'solid-js';

function AnnouncementBanner() {
  const [isVisible, setIsVisible] = createSignal(true);

  onMount(() => {
    const bannerClosed = localStorage.getItem('bannerClosed');
    if (bannerClosed === 'true') {
      setIsVisible(false);
    }
  });

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('bannerClosed', 'true');
  };

  const handleContactNow = () => {
    window.open('https://wa.me/message/VMRRZKYWGHZMM1', '_blank');
  };

  return (
    <Show when={isVisible()}>
      <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <span class="block font-semibold mb-2 sm:mb-0">
          نسعى لتقديم أفضل تجربة لك! هذا التطبيق لا يزال في نسخته التجريبية وسيتم الانتهاء من التطوير قريبًا. ساعدنا على التحسين بتقديم آرائك واقتراحاتك من خلال الاتصال بنا على الواتساب.
        </span>
        <div class="flex items-center">
          <button
            class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 box-border mr-2"
            onClick={handleContactNow}
          >
            اتصل الآن
          </button>
          <button
            class="text-yellow-700 hover:text-yellow-900 ml-2 focus:outline-none cursor-pointer"
            onClick={handleClose}
          >
            <svg class="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>إغلاق</title>
              <path d="M14.348 5.652a1 1 0 1 0-1.414-1.414L10 7.172 7.066 4.238a1 1 0 1 0-1.414 1.414L8.586 8.586l-2.934 2.934a1 1 0 1 0 1.414 1.414L10 10.828l2.934 2.934a1 1 0 1 0 1.414-1.414L11.414 8.586l2.934-2.934z" />
            </svg>
          </button>
        </div>
      </div>
    </Show>
  );
}

export default AnnouncementBanner;