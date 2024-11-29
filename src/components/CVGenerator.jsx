import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

function CVGenerator() {
  const [personalInfo, setPersonalInfo] = createSignal({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
  });
  const [education, setEducation] = createSignal('');
  const [experience, setExperience] = createSignal('');
  const [skills, setSkills] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [generatedCV, setGeneratedCV] = createSignal('');

  const handleGenerateCV = async () => {
    if (loading()) return;
    setLoading(true);
    setGeneratedCV('');

    const prompt = `
      الرجاء إنشاء سيرة ذاتية احترافية باللغة العربية مع تنسيق ومظهر جذاب بناءً على المعلومات التالية:
      المعلومات الشخصية:
      الاسم الكامل: ${personalInfo().fullName}
      البريد الإلكتروني: ${personalInfo().email}
      رقم الهاتف: ${personalInfo().phone}
      العنوان: ${personalInfo().address}
      الملخص الشخصي: ${personalInfo().summary}
      التعليم:
      ${education()}
      الخبرات العملية:
      ${experience()}
      المهارات:
      ${skills()}
      الرجاء تنسيق السيرة الذاتية بشكل جذاب واحترافي.
    `;

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });

      setGeneratedCV(response);
    } catch (error) {
      console.error('Error generating CV:', error);
      alert('حدث خطأ أثناء توليد السيرة الذاتية. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = async () => {
    // Convert the generated CV (Markdown/Text) to a Word document using docx library
    const doc = new Document();

    const lines = generatedCV().split('\n');

    lines.forEach((line) => {
      if (line.trim() === '') {
        doc.addSection({
          children: [new Paragraph('')],
        });
      } else if (line.startsWith('#')) {
        // Heading
        const headingLevel = line.match(/^#+/)[0].length;
        const text = line.replace(/^#+\s*/, '');
        doc.addSection({
          children: [
            new Paragraph({
              text: text,
              heading: headingLevel === 1 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2,
            }),
          ],
        });
      } else {
        // Regular text
        doc.addSection({
          children: [new Paragraph(line)],
        });
      }
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'CV.docx');
  };

  const handleInputChange = (field, value) => {
    setPersonalInfo({ ...personalInfo(), [field]: value });
  };

  return (
    <div class="flex flex-col flex-grow h-full px-4">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">منشئ السيرة الذاتية الذكي</h2>
        <p class="text-lg text-center text-gray-700">أدخل معلوماتك لإنشاء سيرة ذاتية احترافية بتنسيق ومظهر جذاب</p>
      </div>
      <div class="flex flex-col mb-4 space-y-4">
        <div>
          <label class="block text-gray-700 font-semibold mb-2">الاسم الكامل</label>
          <input
            type="text"
            value={personalInfo().fullName}
            onInput={(e) => handleInputChange('fullName', e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            placeholder="أدخل اسمك الكامل"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            value={personalInfo().email}
            onInput={(e) => handleInputChange('email', e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
          <input
            type="text"
            value={personalInfo().phone}
            onInput={(e) => handleInputChange('phone', e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            placeholder="أدخل رقم هاتفك"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">العنوان</label>
          <input
            type="text"
            value={personalInfo().address}
            onInput={(e) => handleInputChange('address', e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            placeholder="أدخل عنوانك"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">الملخص الشخصي</label>
          <textarea
            value={personalInfo().summary}
            onInput={(e) => handleInputChange('summary', e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-24"
            placeholder="أدخل ملخصًا عن نفسك"
          ></textarea>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">التعليم</label>
          <textarea
            value={education()}
            onInput={(e) => setEducation(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-24"
            placeholder="أدخل تفاصيل تعليمك"
          ></textarea>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">الخبرات العملية</label>
          <textarea
            value={experience()}
            onInput={(e) => setExperience(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-24"
            placeholder="أدخل خبراتك العملية"
          ></textarea>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">المهارات</label>
          <textarea
            value={skills()}
            onInput={(e) => setSkills(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-24"
            placeholder="أدخل مهاراتك"
          ></textarea>
        </div>
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border mt-4 ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleGenerateCV}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري التوليد...">
            إنشاء السيرة الذاتية
          </Show>
        </button>
      </div>
      <Show when={generatedCV()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">السيرة الذاتية المُولدة:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white max-h-96 overflow-auto mb-4">
            <p class="whitespace-pre-wrap text-gray-800">{generatedCV()}</p>
          </div>
          <button
            class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform box-border"
            onClick={handleDownloadCV}
          >
            تحميل السيرة الذاتية
          </button>
        </div>
      </Show>
    </div>
  );
}

export default CVGenerator;