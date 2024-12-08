import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';
import { saveAs } from 'file-saver';
import HeaderButtons from './HeaderButtons';
import EditSiteForm from './EditSiteForm';

function GeneratedSite(props) {
  const navigate = useNavigate();
  const [editInstructions, setEditInstructions] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [editing, setEditing] = createSignal(false);

  const user = props.user;

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
      <HeaderButtons
        editing={editing}
        setEditing={setEditing}
        handleBack={handleBack}
        handleRegenerate={handleRegenerate}
        handleDownloadSite={handleDownloadSite}
      />
      <Show when={editing()}>
        <EditSiteForm
          editInstructions={editInstructions}
          setEditInstructions={setEditInstructions}
          loading={loading}
          handleEditSite={handleEditSite}
        />
      </Show>
      <div class="flex-grow overflow-auto">
        <iframe
          srcDoc={props.generatedSite}
          class="w-full h-full border-0"
          title="Generated Site Preview"
        ></iframe>
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
    </div>
  );
}

export default GeneratedSite;