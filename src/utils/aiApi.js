import { createEvent } from '../supabaseClient';

export async function processTextWithAI(extractedText, setError) {
  const prompt = `قم بتصحيح النص العربي التالي، وتنسيقه بطريقة احترافية، مع إضافة علامات الترقيم والفقرات المناسبة، وتصحيح أي أخطاء، وقدم النص المنسق فقط:

النص:
${extractedText}`;

  try {
    const aiResponse = await createEvent('chatgpt_request', {
      prompt: prompt,
      response_type: 'text',
    });

    return aiResponse;
  } catch (error) {
    console.error('Error processing text with AI:', error);
    setError('حدث خطأ أثناء معالجة النص بواسطة الذكاء الاصطناعي.');
    return null;
  }
}