import { createSignal, Show, onMount } from 'solid-js';
import Features from './Features';
import SocialShare from './SocialShare';

function ShareApp() {
  const appTitle = 'Blind Accessibility';
  const appDescription = 'انطلق نحو الاستقلالية مع Blind Accessibility – كل ما تحتاجه في مكان واحد.';
  const appLink = 'https://1e6167b0-3c7b-4cce-b33f-7551629c2e2a.vercel.app';
  const appDownloadLink = 'https://archive.org/download/Blindaccess/Blindaccess.apk';
  const audioLink = 'https://archive.org/download/sample_audio_file_201909/sample_audio_file.mp3';

  const [isPlaying, setIsPlaying] = createSignal(false);
  const [copySuccess, setCopySuccess] = createSignal('');
  let audioRef;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appLink).then(
      () => {
        setCopySuccess('تم نسخ رابط التطبيق!');
        setTimeout(() => setCopySuccess(''), 2000);
      },
      () => {
        setCopySuccess('حدث خطأ أثناء نسخ الرابط. يرجى المحاولة مرة أخرى.');
      }
    );
  };

  const handlePlayPause = () => {
    if (audioRef) {
      if (isPlaying()) {
        audioRef.pause();
        setIsPlaying(false);
      } else {
        audioRef
          .play()
          .then(() => {
            setIsPlaying(true);
            audioRef.onended = () => {
              setIsPlaying(false);
            };
          })
          .catch((error) => {
            console.error('Error playing audio:', error);
            alert('حدث خطأ أثناء تشغيل المقطع الصوتي.');
          });
      }
    }
  };

  onMount(() => {
    if (audioRef) {
      audioRef
        .play()
        .then(() => {
          setIsPlaying(true);
          audioRef.onended = () => {
            setIsPlaying(false);
          };
        })
        .catch((error) => {
          console.error('Error auto-playing audio:', error);
        });
    }
  });

  const features = [
    'تجربة مستخدم محسنة للمكفوفين وضعاف البصر',
    'خدمات وأدوات متعددة في مكان واحد',
    'واجهة سهلة الاستخدام ومتوافقة مع قارئات الشاشة',
    'تحديثات مستمرة وميزات جديدة',
  ];

  return (
    <div class="flex flex-col min-h-screen">
      <header class="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-8">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold mb-4">{appTitle}</h1>
          <p class="text-xl">{appDescription}</p>
          <div class="mt-6">
            <button
              class="cursor-pointer px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform"
              onClick={handlePlayPause}
            >
              {isPlaying() ? 'إيقاف المقطع الصوتي' : 'تشغيل المقطع الصوتي'}
            </button>
            <audio ref={(el) => (audioRef = el)} src={audioLink} class="hidden">
              متصفحك لا يدعم تشغيل الصوت. يرجى تحديث المتصفح أو استخدام متصفح آخر.
            </audio>
          </div>
          <button
            class="cursor-pointer mt-6 px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => window.open(appDownloadLink, '_blank')}
          >
            تحميل التطبيق
          </button>
        </div>
      </header>

      <main class="flex-grow bg-gray-100 py-8">
        <div class="container mx-auto px-4">
          <Features appTitle={appTitle} features={features} />
          <SocialShare
            appTitle={appTitle}
            appDescription={appDescription}
            appLink={appLink}
            copySuccess={copySuccess}
            handleCopyLink={handleCopyLink}
          />
        </div>
        <div class="mt-8 text-center text-gray-700">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline"
          >
            تم الإنشاء باستخدام ZAPT
          </a>
        </div>
      </main>
    </div>
  );
}

export default ShareApp;