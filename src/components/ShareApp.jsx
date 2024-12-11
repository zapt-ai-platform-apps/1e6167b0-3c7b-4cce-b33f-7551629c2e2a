import HeaderComponent from './HeaderComponent';
import Features from './Features';
import SocialShare from './SocialShare';
import { useShareApp } from '../hooks/useShareApp';

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
    <div class="flex flex-col h-full">
      <HeaderComponent
        appTitle={appTitle}
        appDescription={appDescription}
        handlePlayPause={handlePlayPause}
        isPlaying={isPlaying}
        setAudioRef={setAudioRef}
        audioLink={audioLink}
        appDownloadLink={appDownloadLink}
      />
      <div class="flex-grow">
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
    </div>
  );
}

export default ShareApp;