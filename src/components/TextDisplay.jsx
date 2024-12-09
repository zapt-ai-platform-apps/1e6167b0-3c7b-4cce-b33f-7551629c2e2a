import { Show } from 'solid-js';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';
import { createEvent } from '../supabaseClient';

function TextDisplay(props) {
  const {
    processedText,
    extractedText,
    audioUrl,
    setAudioUrl,
    loadingTTS,
    setLoadingTTS,
  } = props;

  const handleCopyText = () => {
    const text = processedText() || extractedText();
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('تم نسخ النص إلى الحافظة.');
      }, () => {
        alert('حدث خطأ أثناء نسخ النص.');
      });
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
        sections: [{
          children: [
            new Paragraph({
              text: text,
              bidirectional: true,
            })
          ],
        }],
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
    <div class="mt-4">
      <h3 class="text-lg font-bold mb-2 text-purple-600">النص الناتج:</h3>
      <div class="p-4 border border-gray-300 rounded-lg bg-white" dir="rtl">
        <p class="whitespace-pre-wrap text-gray-800" style={{ 'font-family': "'Noto Kufi Arabic', 'Tahoma', sans-serif" }}>
          {processedText() || extractedText()}
        </p>
      </div>
      <div class="mt-4 flex flex-wrap space-x-4 space-x-reverse">
        <button
          class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform mt-2"
          onClick={handleCopyText}
        >
          نسخ النص
        </button>
        <button
          class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform mt-2"
          onClick={handleDownloadText}
        >
          تنزيل كنص
        </button>
        <button
          class="cursor-pointer px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out transform mt-2"
          onClick={handleDownloadDocx}
        >
          تنزيل كملف Word
        </button>
        <button
          class={`cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform mt-2 ${
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
      <Show when={audioUrl()}>
        <div class="mt-4">
          <audio controls src={audioUrl()} class="w-full">
            متصفحك لا يدعم تشغيل الصوت. يرجى تحديث المتصفح أو استخدام متصفح آخر.
          </audio>
        </div>
      </Show>
    </div>
  );
}

export default TextDisplay;