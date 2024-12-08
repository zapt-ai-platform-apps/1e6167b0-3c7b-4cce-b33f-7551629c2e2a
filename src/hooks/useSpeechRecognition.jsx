import { onMount } from 'solid-js';

export function useSpeechRecognition(onResult, onError, setListening) {
  let recognition;

  onMount(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.lang = 'ar-EG';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setListening(true);
      };

      recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
        setListening(false);
        if (onError) onError(event.error);
      };

      recognition.onend = function () {
        console.log('Speech recognition ended');
        setListening(false);
      };
    } else {
      alert('متصفحك لا يدعم التعرف على الصوت.');
    }
  });

  const startRecognition = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return { startRecognition, stopRecognition };
}