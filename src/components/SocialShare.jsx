import { Show } from 'solid-js';

function SocialShare(props) {
  const { appTitle, appDescription, appLink, copySuccess, handleCopyLink } = props;

  return (
    <section class="text-center mb-12">
      <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">
        شارك التطبيق مع أصدقائك
      </h2>
      <p class="text-lg mb-6 text-center">
        ساعدنا في نشر الفائدة ومشاركة التطبيق مع الآخرين.
      </p>
      <div class="flex space-x-4 space-x-reverse justify-center mb-6">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer transform hover:scale-105 transition duration-300"
        >
          <img src="/assets/facebook.svg" alt="فيسبوك" class="w-12 h-12" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            appDescription
          )}&url=${encodeURIComponent(appLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer transform hover:scale-105 transition duration-300"
        >
          <img src="/assets/twitter.svg" alt="تويتر" class="w-12 h-12" />
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(appDescription)}%20${encodeURIComponent(
            appLink
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer transform hover:scale-105 transition duration-300"
        >
          <img src="/assets/whatsapp.svg" alt="واتساب" class="w-12 h-12" />
        </a>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(appLink)}&text=${encodeURIComponent(
            appDescription
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer transform hover:scale-105 transition duration-300"
        >
          <img src="/assets/telegram.svg" alt="تليجرام" class="w-12 h-12" />
        </a>
      </div>
      <div class="text-center mb-4">
        <p class="text-lg mb-2">أو قم بنسخ رابط التطبيق ومشاركته:</p>
        <div class="flex items-center justify-center">
          <input
            type="text"
            value={appLink}
            readOnly
            class="w-full md:w-1/2 p-2 border border-gray-300 rounded-l-lg focus:outline-none box-border"
          />
          <button
            class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition duration-300 ease-in-out transform"
            onClick={handleCopyLink}
          >
            نسخ الرابط
          </button>
        </div>
        <Show when={copySuccess()}>
          <p class="text-green-600 mt-2">{copySuccess()}</p>
        </Show>
      </div>
    </section>
  );
}

export default SocialShare;