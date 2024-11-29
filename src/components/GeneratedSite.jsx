import { useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';

function GeneratedSite(props) {
  const navigate = useNavigate();

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

  return (
    <div class="h-full flex flex-col">
      <div class="flex justify-between items-center p-4">
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
      <div class="flex-grow border border-gray-300 rounded-lg overflow-hidden">
        <iframe
          srcDoc={props.generatedSite}
          class="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}

export default GeneratedSite;