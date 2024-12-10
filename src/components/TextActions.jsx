import { Show } from 'solid-js';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';
import { createEvent } from '../supabaseClient';

function TextActions(props) {
  const {
    processedText,
    extractedText,
    setAudioUrl,
    loadingTTS,
    setLoadingTTS,
  } = props;

  const handleCopyText = () => {
    const text = processedText() || extractedText();
    if (text) {
      navigator.clipboard.writeText(text).then(
        () => {
          alert('تم نسخ النص إلى الحافظة.');
        },
        () => {
          alert('حدث خطأ أثناء نسخ النص.');
        }
      );
    }
  };

  const handleDownloadText = () => {
    const text = processedText() || extractedText();
    if (text) {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'extracted_text.txt');
    }
  };

  const handleDownloadDocx = async () => {
    const text = processedText() || extractedText();
    if (text) {
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: text,
                bidirectional: true,
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'extracted_text.docx');
    }
  };

  const handleTextToSpeech = async () => {
    const text = processedText() || extractedText();
    if (text) {
      setLoadingTTS(true);
      try {
        const response = await createEvent('text_to_speech', {
          text: text,
        });

        if (response) {
          setAudioUrl(response);
        } else {
          alert('حدث خطأ أثناء توليد الصوت.');
        }
      } catch (error) {
        console.error('Error generating speech:', error);
        alert('حدث خطأ أثناء توليد الصوت. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoadingTTS(false);
      }
    }
  };

  return (
    <div class="mt-4 flex flex-wrap space-x-4 space-x-reverse">
      <button
        class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform mt-2"
        onClick={handleCopyText}
      >
        نسخ النص
      </button>
      <button
        class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform mt-2"
        onClick={handleDownloadText}
      >
        تنزيل كنص
      </button>
      <button
        class="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out transform mt-2"
        onClick={handleDownloadDocx}
      >
        تنزيل كملف Word
      </button>
      <button
        class={`cursor-pointer px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition duration-300 ease-in-out transform mt-2 ${
          loadingTTS() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleTextToSpeech}
        disabled={loadingTTS()}
      >
        <Show when={!loadingTTS()} fallback="جاري توليد الصوت...">
          تحويل إلى صوت
        </Show>
      </button>
    </div>
  );
}

export default TextActions;