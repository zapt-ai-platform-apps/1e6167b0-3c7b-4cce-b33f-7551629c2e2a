import { createEvent } from '../supabaseClient';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.js?url';

GlobalWorkerOptions.workerSrc = workerUrl;

export async function extractTextFromPDF(file, setError) {
  try {
    const fileData = await file.arrayBuffer();
    const pdf = await getDocument({ data: fileData }).promise;
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