function SocialMediaLinks() {
  return (
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4 text-purple-600 text-center">تابعنا على وسائل التواصل الاجتماعي</h2>
      <div class="flex space-x-4 space-x-reverse justify-center">
        <a
          href="https://www.facebook.com/profile.php?id=61550796732035&mibextid=ZbWKwL"
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer transform hover:scale-105 transition duration-300"
        >
          <img src="/assets/facebook.svg" alt="فيسبوك" class="w-12 h-12" />
        </a>
        <a
          href="https://www.youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer transform hover:scale-105 transition duration-300"
        >
          <img src="/assets/youtube.svg" alt="يوتيوب" class="w-12 h-12" />
        </a>
        <a
          href="https://t.me/Blindaccessibilitybot"
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer transform hover:scale-105 transition duration-300"
        >
          <img src="/assets/telegram.svg" alt="تليجرام" class="w-12 h-12" />
        </a>
        <a
          href="https://chat.whatsapp.com/CVW8aHib2SKIXlTroXMxYH"
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer transform hover:scale-105 transition duration-300"
        >
          <img src="/assets/whatsapp.svg" alt="واتساب" class="w-12 h-12" />
        </a>
      </div>
    </div>
  );
}

export default SocialMediaLinks;