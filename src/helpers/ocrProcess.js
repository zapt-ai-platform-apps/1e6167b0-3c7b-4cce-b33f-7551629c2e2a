import { createEvent } from '../supabaseClient';

export async function extractAndProcessText(file) {
  const formData = new FormData();
  formData.append('language', 'ara');
  formData.append('isOverlayRequired', 'false');
  formData.append('isSearchablePdfHideTextLayer', 'true');
  formData.append('file', file);

  let extractedText = '';
  let processedText = '';
  let error = '';

  try {
    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        'apikey': import.meta.env.VITE_PUBLIC_OCRSPACE_API_KEY,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();

      if (data.IsErroredOnProcessing) {
        error = 'حدث خطأ أثناء معالجة الملف: ' + data.ErrorMessage[0];
      } else if (data.ParsedResults && data.ParsedResults.length > 0) {
        extractedText = data.ParsedResults.map(result => result.ParsedText).join('\n');

        const prompt = `قم بتصحيح النص العربي التالي، وتنسيقه بطريقة احترافية، مع إضافة علامات الترقيم والفقرات المناسبة، وتصحيح أي أخطاء، وقدم النص المنسق فقط:

النص:
${extractedText}`;

        const aiResponse = await createEvent('chatgpt_request', {
          prompt: prompt,
          response_type: 'text',
        });

        processedText = aiResponse;
      } else {
        error = 'لم يتم العثور على نص في الملف.';
      }
    } else {
      error = 'حدث خطأ أثناء الاتصال بخدمة OCR.';
    }
  } catch (err) {
    console.error('Error extracting text:', err);
    error = 'حدث خطأ أثناء استخراج النص. يرجى المحاولة مرة أخرى.';
  }

  return { extracted: extractedText, processed: processedText, error };
}