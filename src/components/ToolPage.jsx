import { useParams, useNavigate } from '@solidjs/router';
import ChatAssistant from './ChatAssistant';
import SmartWritingAssistant from './SmartWritingAssistant';
import SmartVoiceAssistant from './SmartVoiceAssistant';
import ArabicRadio from './ArabicRadio';
import ArticleGenerator from './ArticleGenerator';

function ToolPage() {
  const params = useParams();
  const navigate = useNavigate();
  const toolName = params.toolName;

  const goBack = () => {
    navigate(-1);
  };

  if (toolName === 'chat-assistant') {
    return (
      <div class="h-full flex flex-col">
        <button
          class="cursor-pointer px-4 py-2 mt-4 ml-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border self-start"
          onClick={goBack}
        >
          الرجوع
        </button>
        <ChatAssistant />
      </div>
    );
  } else if (toolName === 'smart-writing-assistant') {
    return (
      <div class="h-full flex flex-col">
        <button
          class="cursor-pointer px-4 py-2 mt-4 ml-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border self-start"
          onClick={goBack}
        >
          الرجوع
        </button>
        <SmartWritingAssistant />
      </div>
    );
  } else if (toolName === 'smart-voice-assistant') {
    return (
      <div class="h-full flex flex-col">
        <button
          class="cursor-pointer px-4 py-2 mt-4 ml-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border self-start"
          onClick={goBack}
        >
          الرجوع
        </button>
        <SmartVoiceAssistant />
      </div>
    );
  } else if (toolName === 'arabic-radio') {
    return (
      <div class="h-full flex flex-col">
        <button
          class="cursor-pointer px-4 py-2 mt-4 ml-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border self-start"
          onClick={goBack}
        >
          الرجوع
        </button>
        <ArabicRadio />
      </div>
    );
  } else if (toolName === 'article-generator') {
    return (
      <div class="h-full flex flex-col">
        <button
          class="cursor-pointer px-4 py-2 mt-4 ml-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border self-start"
          onClick={goBack}
        >
          الرجوع
        </button>
        <ArticleGenerator />
      </div>
    );
  } else {
    return (
      <div class="text-center mt-8">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">الأداة غير متوفرة</h2>
        <p class="text-lg mb-6">عذراً، الأداة التي طلبتها غير متوفرة حالياً.</p>
        <button
          class="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border"
          onClick={goBack}
        >
          الرجوع
        </button>
      </div>
    );
  }
}

export default ToolPage;