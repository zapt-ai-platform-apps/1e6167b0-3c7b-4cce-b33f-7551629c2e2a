export function handleToolClick(toolName, navigate) {
  if (toolName === 'المساعد الذكي') {
    navigate('/tools/chat-assistant');
  } else if (toolName === 'مساعد الكتابة الذكي') {
    navigate('/tools/smart-writing-assistant');
  } else if (toolName === 'المساعد الصوتي الذكي') {
    navigate('/tools/smart-voice-assistant');
  } else if (toolName === 'منشئ السيرة الذاتية الذكي') {
    navigate('/tools/cv-generator');
  } else if (toolName === 'الراديو العربي') {
    navigate('/tools/arabic-radio');
  } else if (toolName === 'منشئ المحتوى النصي') {
    navigate('/tools/article-generator');
  } else if (toolName === 'أداة استخراج النص من الصورة') {
    navigate('/tools/image-to-text');
  } else if (toolName === 'قارئ PDF الاحترافي') {
    navigate('/tools/pdf-reader');
  } else if (toolName === 'حاسبة العمر والأبراج') {
    navigate('/tools/age-horoscope-calculator');
  } else if (toolName === 'أداة تجربة الأكواد البرمجية') {
    navigate('/tools/code-playground');
  } else {
    alert('هذه الأداة غير متوفرة حاليًا.');
  }
}