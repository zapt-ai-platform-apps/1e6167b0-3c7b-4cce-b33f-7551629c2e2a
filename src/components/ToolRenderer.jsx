import ChatAssistant from './ChatAssistant';
import SmartWritingAssistant from './SmartWritingAssistant';
import SmartVoiceAssistant from './SmartVoiceAssistant';
import ArabicRadio from './ArabicRadio';
import ArticleGenerator from './ArticleGenerator';
import ImageGenerator from './ImageGenerator';
import WebsiteBuilder from './WebsiteBuilder';
import CVGenerator from './CVGenerator';
import ImageToText from './ImageToText';
import PDFReader from './PDFReader';
import AgeHoroscopeCalculator from './AgeHoroscopeCalculator';
import ToolNotAvailable from './ToolNotAvailable';

function ToolRenderer(props) {
  const {
    toolName,
    navigate,
    setGeneratedSite,
    user,
  } = props;

  switch (toolName) {
    case 'chat-assistant':
      return <ChatAssistant />;
    case 'smart-writing-assistant':
      return <SmartWritingAssistant />;
    case 'smart-voice-assistant':
      return <SmartVoiceAssistant />;
    case 'arabic-radio':
      return <ArabicRadio />;
    case 'article-generator':
      return <ArticleGenerator />;
    case 'image-generator':
      return <ImageGenerator />;
    case 'website-builder':
      return <WebsiteBuilder setGeneratedSite={setGeneratedSite} user={user} />;
    case 'cv-generator':
      return <CVGenerator />;
    case 'image-to-text':
      return <ImageToText />;
    case 'pdf-reader':
      return <PDFReader />;
    case 'age-horoscope-calculator':
      return <AgeHoroscopeCalculator />;
    default:
      return <ToolNotAvailable navigate={navigate} />;
  }
}

export default ToolRenderer;