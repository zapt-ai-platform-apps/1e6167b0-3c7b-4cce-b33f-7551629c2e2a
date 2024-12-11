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