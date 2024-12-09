import { createSignal, onMount } from 'solid-js';
import {
  appTitle,
  appDescription,
  appLink,
  appDownloadLink,
  audioLink,
  features,
} from '../constants/appConstants';

export function useShareApp(props) {
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

  return {
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
  };
}