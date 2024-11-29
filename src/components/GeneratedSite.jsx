import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';
import { saveAs } from 'file-saver';

function GeneratedSite(props) {
  const navigate = useNavigate();
  const [editInstructions, setEditInstructions] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [editing, setEditing] = createSignal(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRegenerate = () => {
    navigate('/tools/website-builder');
  };

  const handleEditSite = async () => {
    if (!editInstructions()) return;
    setLoading(true);
    try {
      const prompt = `يرجى تعديل كود الموقع التالي بناءً على التعليمات: "${editInstructions()}". قدم الكود المحدث بنفس التنسيق.

الموقع الأصلي:
${props.generatedSite}
`;

      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });

      if (response) {
        props.setGeneratedSite(response);
        setEditing(false);
        setEditInstructions('');
      } else {
        alert('حدث خطأ أثناء تعديل الموقع.');
      }
    } catch (error) {
      console.error('Error editing site:', error);
      alert('حدث خطأ أثناء تعديل الموقع. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSite = () => {
    const blob = new Blob([props.generatedSite], { type: 'text/html;charset=utf-8' });
    saveAs(blob, 'website.html');
  };

  return (
    <div class="flex flex-col flex-grow h-full">
      <div class="flex justify-between items-center p-4 bg-gray-100">
        <div class="flex space-x-4 space-x-reverse">
          <button
            class="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border"
            onClick={handleBack}
          >
            الرجوع
          </button>
          <button
            class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform box-border"
            onClick={handleRegenerate}
          >
            إعادة الإنشاء
          </button>
          <button
            class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border"
            onClick={() => setEditing(!editing())}
          >
            {editing() ? 'إلغاء' : 'تعديل الموقع'}
          </button>
          <button
            class="cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform box-border"
            onClick={handleDownloadSite}
          >
            تحميل الموقع
          </button>
        </div>
      </div>
      <Show when={editing()}>
        <div class="p-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">تعديل الموقع باستخدام الذكاء الاصطناعي</h3>
          <textarea
            value={editInstructions()}
            onInput={(e) => setEditInstructions(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-32 mb-4"
            placeholder="أدخل التعليمات الخاصة بالتعديلات التي تريدها..."
          ></textarea>
          <button
            class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleEditSite}
            disabled={loading()}
          >
            {loading() ? 'جاري التعديل...' : 'تعديل الموقع'}
          </button>
        </div>
      </Show>
      <div class="flex-grow overflow-auto">
        <iframe
          srcDoc={props.generatedSite}
          class="w-full h-full border-0"
          title="Generated Site Preview"
        ></iframe>
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

export default GeneratedSite;