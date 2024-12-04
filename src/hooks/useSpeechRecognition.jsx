import { createSignal, onMount, onCleanup } from 'solid-js';

export function useSpeechRecognition(onResult, onError) {
  const [listening, setListening] = createSignal(false);
  let recognition;

  onMount(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.lang = 'ar-EG';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recognition.onstart = () => setListening(true);

      recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
        setListening(false);
        if (onError) onError();
      };

      recognition.onend = function () {
        setListening(false);
      };
    } else {
      alert('متصفحك لا يدعم التعرف على الصوت.');
    }
  });

  const startRecognition = () => {
    if (recognition && !listening()) {
      recognition.start();
    }
  };

  const stopRecognition = () => {
    if (recognition && listening()) {
      recognition.stop();
      setListening(false);
    }
  };

  onCleanup(() => {
    if (recognition && listening()) {
      recognition.stop();
    }
  });

  return { listening, startRecognition, stopRecognition };
}