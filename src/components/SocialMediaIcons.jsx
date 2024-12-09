function SocialMediaIcons(props) {
  const { appLink, appDescription } = props;

  return (
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
  );
}

export default SocialMediaIcons;