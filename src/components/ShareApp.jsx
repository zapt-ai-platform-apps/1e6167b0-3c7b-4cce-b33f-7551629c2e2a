import { createSignal, Show, onMount } from 'solid-js';
import Features from './Features';
import SocialShare from './SocialShare';
import HeaderComponent from './HeaderComponent';

function ShareApp(props) {
  const appTitle = 'Blind Accessibility';
  const appDescription =
    'انطلق نحو الاستقلالية مع Blind Accessibility – كل ما تحتاجه في مكان واحد.';
  const appLink = 'https://1e6167b0-3c7b-4cce-b33f-7551629c2e2a.vercel.app';
  const appDownloadLink =
    'https://archive.org/download/Blindaccess/Blindaccess.apk';
  const audioLink =
    'https://archive.org/download/sample_audio_file_201909/sample_audio_file.mp3';

  const user = props.user;

  const [isPlaying, setIsPlaying] = createSignal(false);
  const [copySuccess, setCopySuccess] = createSignal('');
  let audioRef;

  const setAudioRef = (el) => {
    audioRef = el;
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

  const features = [
    'تجربة مستخدم محسنة للمكفوفين وضعاف البصر',
    'خدمات وأدوات متعددة في مكان واحد',
    'واجهة سهلة الاستخدام ومتوافقة مع قارئات الشاشة',
    'تحديثات مستمرة وميزات جديدة',
  ];

  return (
    <div class="flex flex-col min-h-screen">
      <HeaderComponent
        appTitle={appTitle}
        appDescription={appDescription}
        appDownloadLink={appDownloadLink}
        audioLink={audioLink}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        setAudioRef={setAudioRef}
      />
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
        <Show when={user() && user().email === 'daoudi.abdennour@gmail.com'}>
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
        </Show>
      </main>
    </div>
  );
}

export default ShareApp;