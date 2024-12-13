import { createEvent } from '../supabaseClient';
import { createClient } from '@supabase/supabase-js';
import * as pdfjsLib from 'pdfjs-dist';

export async function extractTextFromImage(file, setError) {
  const formData = new FormData();
  formData.append('language', 'ara');
  formData.append('isOverlayRequired', 'false');
  formData.append('file', file);

  try {
    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        apikey: import.meta.env.VITE_PUBLIC_OCRSPACE_API_KEY,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.IsErroredOnProcessing) {
        setError('حدث خطأ أثناء معالجة الصورة: ' + data.ErrorMessage[0]);
        return null;
      } else if (data.ParsedResults && data.ParsedResults.length > 0) {
        return data.ParsedResults[0].ParsedText;
      } else {
        setError('لم يتم العثور على نص في الصورة.');
        return null;
      }
    } else {
      setError('حدث خطأ أثناء الاتصال بخدمة OCR.');
      return null;
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    setError('حدث خطأ أثناء استخراج النص. يرجى المحاولة مرة أخرى.');
    return null;
  }
}

export async function extractTextFromPDF(file, setError) {
  try {
    const loadingTask = pdfjsLib.getDocument({ data: await file.arrayBuffer() });
    const pdf = await loadingTask.promise;
    let extractedText = '';
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      extractedText += strings.join(' ') + '\n';
    }
    return extractedText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    setError('حدث خطأ أثناء استخراج النص من ملف PDF.');
    return null;
  }
}