import ChatAssistant from './ChatAssistant';
import SmartWritingAssistant from './SmartWritingAssistant';
import SmartVoiceAssistant from './SmartVoiceAssistant';
import ArabicRadio from './ArabicRadio';
import ArticleGenerator from './ArticleGenerator';
import CVGenerator from './CVGenerator';
import ImageToText from './ImageToText';
import AgeHoroscopeCalculator from './AgeHoroscopeCalculator';
import PDFReader from './PDFReader';
import ToolNotAvailable from './ToolNotAvailable';

function ToolRenderer(props) {
  const {
    toolName,
    navigate,
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
    case 'cv-generator':
      return <CVGenerator />;
    case 'image-to-text':
      return <ImageToText />;
    case 'age-horoscope-calculator':
      return <AgeHoroscopeCalculator />;
    case 'pdf-reader':
      return <PDFReader />;
    default:
      return <ToolNotAvailable navigate={navigate} />;
  }
}

export default ToolRenderer;