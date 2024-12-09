import { Show } from 'solid-js';
import { useShareApp } from '../hooks/useShareApp';
import Features from './Features';
import SocialShare from './SocialShare';
import HeaderComponent from './HeaderComponent';

function ShareApp(props) {
  const {
    appTitle,
    appDescription,
    appLink,
    appDownloadLink,
    audioLink,
    features,
    user,
    isPlaying,
    handlePlayPause,
    setAudioRef,
    copySuccess,
    handleCopyLink,
  } = useShareApp(props);

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