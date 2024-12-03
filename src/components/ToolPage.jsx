import { createSignal } from 'solid-js';
import { useParams, useNavigate, Routes, Route, Navigate } from '@solidjs/router';
import ChatAssistant from './ChatAssistant';
import SmartWritingAssistant from './SmartWritingAssistant';
import SmartVoiceAssistant from './SmartVoiceAssistant';
import ArabicRadio from './ArabicRadio';
import ArticleGenerator from './ArticleGenerator';
import ImageGenerator from './ImageGenerator';
import WebsiteBuilder from './WebsiteBuilder';
import GeneratedSite from './GeneratedSite';
import CVGenerator from './CVGenerator';
import ImageToText from './ImageToText';
import PDFReader from './PDFReader';

function ToolPage() {
  const params = useParams();
  const navigate = useNavigate();
  const toolName = params.toolName;

  const [generatedSite, setGeneratedSite] = createSignal('');

  return (
    <div class="h-full flex flex-col">
      <Routes>
        <Route path="/" element={
          <>
            <button
              class="cursor-pointer px-4 py-2 mt-4 ml-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border self-start"
              onClick={() => navigate(-1)}
            >
              الرجوع
            </button>
            {toolName === 'chat-assistant' && <ChatAssistant />}
            {toolName === 'smart-writing-assistant' && <SmartWritingAssistant />}
            {toolName === 'smart-voice-assistant' && <SmartVoiceAssistant />}
            {toolName === 'arabic-radio' && <ArabicRadio />}
            {toolName === 'article-generator' && <ArticleGenerator />}
            {toolName === 'image-generator' && <ImageGenerator />}
            {toolName === 'website-builder' && (
              <WebsiteBuilder setGeneratedSite={setGeneratedSite} />
            )}
            {toolName === 'cv-generator' && <CVGenerator />}
            {toolName === 'image-to-text' && <ImageToText />}
            {toolName === 'pdf-reader' && <PDFReader />}
            {!(toolName in {'chat-assistant':1,'smart-writing-assistant':1,'smart-voice-assistant':1,'arabic-radio':1,'article-generator':1,'image-generator':1,'website-builder':1,'cv-generator':1,'image-to-text':1,'pdf-reader':1}) && (
              <div class="text-center mt-8">
                <h2 class="text-2xl font-bold mb-4 text-purple-600">الأداة غير متوفرة</h2>
                <p class="text-lg mb-6">عذراً، الأداة التي طلبتها غير متوفرة حالياً.</p>
                <button
                  class="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border"
                  onClick={() => navigate(-1)}
                >
                  الرجوع
                </button>
              </div>
            )}
          </>
        } />
        {toolName === 'website-builder' && (
          <Route path="/generated" element={
            <GeneratedSite generatedSite={generatedSite} setGeneratedSite={setGeneratedSite} />
          } />
        )}
        <Route path="*" element={<Navigate href="/" />} />
      </Routes>
    </div>
  );
}

export default ToolPage;