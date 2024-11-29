import { useNavigate } from '@solidjs/router';
import { onMount, createSignal, Show } from 'solid-js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { createEvent } from '../supabaseClient';

function GeneratedSite(props) {
  const navigate = useNavigate();
  const [modificationInstructions, setModificationInstructions] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');
  const [showModifySection, setShowModifySection] = createSignal(false);

  onMount(() => {
    if (!props.generatedSite) {
      navigate(-1);
    }
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRegenerate = () => {
    props.setGeneratedSite('');
    navigate('/tools/website-builder');
  };

  const handleDownloadZip = async () => {
    try {
      const zip = new JSZip();
      zip.file('index.html', props.generatedSite);

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'website.zip');
    } catch (error) {
      console.error('Error generating ZIP file:', error);
      alert('حدث خطأ أثناء تحميل الموقع. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleModifySite = async () => {
    if (!modificationInstructions()) {
      alert('يرجى إدخال التعليمات المطلوبة لتعديل الموقع.');
      return;
    }
    setLoading(true);
    setMessage('');

    const prompt = 'Please modify the following HTML code based on these instructions:\n"' + modificationInstructions() + '"\n\nHere is the HTML code:\n' + props.generatedSite + '\n\nProvide the modified HTML code only.';

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });

      if (response) {
        props.setGeneratedSite(response);
        setMessage('تم تعديل الموقع بنجاح.');
        setModificationInstructions('');
      } else {
        alert('حدث خطأ أثناء تعديل الموقع.');
      }
    } catch (error) {
      console.error('Error modifying site:', error);
      alert('حدث خطأ أثناء تعديل الموقع. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="h-full flex flex-col">
      <div class="p-4">
        {/* Top buttons */}
        <div class="flex justify-between items-center mb-4">
          <div class="flex space-x-2 space-x-reverse">
            <button
              class="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border"
              onClick={handleGoBack}
            >
              الرجوع
            </button>
            <button
              class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform box-border"
              onClick={handleRegenerate}
            >
              إعادة الإنشاء
            </button>
          </div>
          <div class="flex items-center space-x-2 space-x-reverse">
            <button
              class="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border"
              onClick={() => setShowModifySection(!showModifySection())}
            >
              تعديل الموقع
            </button>
            <button
              class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border"
              onClick={handleDownloadZip}
            >
              تحميل الموقع
            </button>
          </div>
        </div>
        <Show when={showModifySection()}>
          <div class="mb-4">
            <h3 class="text-lg font-bold mb-2 text-purple-600">تعديل الموقع باستخدام الذكاء الاصطناعي</h3>
            <textarea
              value={modificationInstructions()}
              onInput={(e) => setModificationInstructions(e.target.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-32 mb-4"
              placeholder="أدخل التعليمات الخاصة بالتعديلات التي تريدها..."
            ></textarea>
            <button
              class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${
                loading() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleModifySite}
              disabled={loading()}
            >
              <Show when={!loading()} fallback="جاري التعديل...">
                تعديل الموقع
              </Show>
            </button>
            <Show when={message()}>
              <div class="mt-4 text-green-600 font-semibold">
                {message()}
              </div>
            </Show>
          </div>
        </Show>
      </div>
      <div class="flex-grow border border-gray-300 rounded-lg overflow-hidden mb-4">
        <iframe
          srcDoc={props.generatedSite}
          class="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}

export default GeneratedSite;