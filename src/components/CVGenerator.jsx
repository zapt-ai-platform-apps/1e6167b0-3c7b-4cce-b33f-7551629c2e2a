import { createSignal, Show } from 'solid-js';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, HeadingLevel, AlignmentType } from 'docx';

function CVGenerator() {
  const [personalInfo, setPersonalInfo] = createSignal({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
  });
  const [educationList, setEducationList] = createSignal([
    { institution: '', degree: '', startYear: '', endYear: '' },
  ]);
  const [experienceList, setExperienceList] = createSignal([
    { company: '', position: '', startYear: '', endYear: '', description: '' },
  ]);
  const [skills, setSkills] = createSignal(['']);
  const [languages, setLanguages] = createSignal(['']);
  const [certifications, setCertifications] = createSignal(['']);
  const [interests, setInterests] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const addEducation = () => {
    setEducationList([...educationList(), { institution: '', degree: '', startYear: '', endYear: '' }]);
  };

  const removeEducation = (index) => {
    const updatedList = [...educationList()];
    updatedList.splice(index, 1);
    setEducationList(updatedList);
  };

  const updateEducation = (index, field, value) => {
    const updatedList = [...educationList()];
    updatedList[index][field] = value;
    setEducationList(updatedList);
  };

  const addExperience = () => {
    setExperienceList([...experienceList(), { company: '', position: '', startYear: '', endYear: '', description: '' }]);
  };

  const removeExperience = (index) => {
    const updatedList = [...experienceList()];
    updatedList.splice(index, 1);
    setExperienceList(updatedList);
  };

  const updateExperience = (index, field, value) => {
    const updatedList = [...experienceList()];
    updatedList[index][field] = value;
    setExperienceList(updatedList);
  };

  const updateSkill = (index, value) => {
    const updatedSkills = [...skills()];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills(), '']);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills()];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const updateLanguage = (index, value) => {
    const updatedLanguages = [...languages()];
    updatedLanguages[index] = value;
    setLanguages(updatedLanguages);
  };

  const addLanguage = () => {
    setLanguages([...languages(), '']);
  };

  const removeLanguage = (index) => {
    const updatedLanguages = [...languages()];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const updateCertification = (index, value) => {
    const updatedCertifications = [...certifications()];
    updatedCertifications[index] = value;
    setCertifications(updatedCertifications);
  };

  const addCertification = () => {
    setCertifications([...certifications(), '']);
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...certifications()];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  const handleInputChange = (field, value) => {
    setPersonalInfo({ ...personalInfo(), [field]: value });
  };

  const handleGenerateCV = async () => {
    if (loading()) return;
    setLoading(true);
    try {
      const doc = new Document({ rtl: true });

      // Add personal information
      doc.addSection({
        properties: {},
        children: [
          new Paragraph({
            text: personalInfo().fullName,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `${personalInfo().email} | ${personalInfo().phone} | ${personalInfo().address}`,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: '',
          }),
          // Summary
          ...(personalInfo().summary ? [
            new Paragraph({
              text: 'الملخص الشخصي',
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: personalInfo().summary,
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              text: '',
            }),
          ] : []),
          // Education
          ...(educationList().length > 0 ? [
            new Paragraph({
              text: 'التعليم',
              heading: HeadingLevel.HEADING_1,
            }),
            ...educationList().map((edu) => [
              new Paragraph({
                text: `${edu.degree} من ${edu.institution} (${edu.startYear} - ${edu.endYear})`,
                heading: HeadingLevel.HEADING_2,
              }),
            ]).flat(),
            new Paragraph({
              text: '',
            }),
          ] : []),
          // Experience
          ...(experienceList().length > 0 ? [
            new Paragraph({
              text: 'الخبرات العملية',
              heading: HeadingLevel.HEADING_1,
            }),
            ...experienceList().map((exp) => [
              new Paragraph({
                text: `${exp.position} في ${exp.company} (${exp.startYear} - ${exp.endYear})`,
                heading: HeadingLevel.HEADING_2,
              }),
              ...(exp.description ? [new Paragraph({
                text: exp.description,
                alignment: AlignmentType.RIGHT,
              })] : []),
            ]).flat(),
            new Paragraph({
              text: '',
            }),
          ] : []),
          // Skills
          ...(skills().filter(skill => skill.trim() !== '').length > 0 ? [
            new Paragraph({
              text: 'المهارات',
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: skills().filter(skill => skill.trim() !== '').join(', '),
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              text: '',
            }),
          ] : []),
          // Languages
          ...(languages().filter(lang => lang.trim() !== '').length > 0 ? [
            new Paragraph({
              text: 'اللغات',
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: languages().filter(lang => lang.trim() !== '').join(', '),
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              text: '',
            }),
          ] : []),
          // Certifications
          ...(certifications().filter(cert => cert.trim() !== '').length > 0 ? [
            new Paragraph({
              text: 'الشهادات',
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: certifications().filter(cert => cert.trim() !== '').join(', '),
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              text: '',
            }),
          ] : []),
          // Interests
          ...(interests().trim() !== '' ? [
            new Paragraph({
              text: 'الهوايات والاهتمامات',
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: interests(),
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              text: '',
            }),
          ] : []),
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'CV.docx');
    } catch (error) {
      console.error('Error generating CV:', error);
      alert('حدث خطأ أثناء توليد السيرة الذاتية. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow h-full px-4">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">منشئ السيرة الذاتية الذكي</h2>
        <p class="text-lg text-center text-gray-700">أدخل معلوماتك لإنشاء سيرة ذاتية احترافية بتنسيق ومظهر جذاب</p>
      </div>
      <div class="flex flex-col mb-4 space-y-4 overflow-y-auto">
        {/* Personal Information */}
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

        {/* Education */}
        <div>
          <label class="block text-gray-700 font-semibold mb-2">التعليم</label>
          {educationList().map((edu, index) => (
            <div class="border border-gray-300 p-4 mb-4 rounded-lg" key={index}>
              <div class="flex flex-col space-y-2">
                <input
                  type="text"
                  value={edu.degree}
                  onInput={(e) => updateEducation(index, 'degree', e.target.value)}
                  class="w-full p-2 border border-gray-300 rounded-lg box-border"
                  placeholder="الشهادة أو الدرجة العلمية"
                />
                <input
                  type="text"
                  value={edu.institution}
                  onInput={(e) => updateEducation(index, 'institution', e.target.value)}
                  class="w-full p-2 border border-gray-300 rounded-lg box-border"
                  placeholder="اسم المؤسسة التعليمية"
                />
                <div class="flex space-x-4 space-x-reverse">
                  <input
                    type="text"
                    value={edu.startYear}
                    onInput={(e) => updateEducation(index, 'startYear', e.target.value)}
                    class="w-full p-2 border border-gray-300 rounded-lg box-border"
                    placeholder="سنة البدء"
                  />
                  <input
                    type="text"
                    value={edu.endYear}
                    onInput={(e) => updateEducation(index, 'endYear', e.target.value)}
                    class="w-full p-2 border border-gray-300 rounded-lg box-border"
                    placeholder="سنة الانتهاء"
                  />
                </div>
                <button
                  class="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform box-border mt-2 self-start"
                  onClick={() => removeEducation(index)}
                >
                  إزالة
                </button>
              </div>
            </div>
          ))}
          <button
            class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform box-border"
            onClick={addEducation}
          >
            إضافة تعليم
          </button>
        </div>

        {/* Experience */}
        <div>
          <label class="block text-gray-700 font-semibold mb-2">الخبرات العملية</label>
          {experienceList().map((exp, index) => (
            <div class="border border-gray-300 p-4 mb-4 rounded-lg" key={index}>
              <div class="flex flex-col space-y-2">
                <input
                  type="text"
                  value={exp.position}
                  onInput={(e) => updateExperience(index, 'position', e.target.value)}
                  class="w-full p-2 border border-gray-300 rounded-lg box-border"
                  placeholder="المسمى الوظيفي"
                />
                <input
                  type="text"
                  value={exp.company}
                  onInput={(e) => updateExperience(index, 'company', e.target.value)}
                  class="w-full p-2 border border-gray-300 rounded-lg box-border"
                  placeholder="اسم الشركة"
                />
                <div class="flex space-x-4 space-x-reverse">
                  <input
                    type="text"
                    value={exp.startYear}
                    onInput={(e) => updateExperience(index, 'startYear', e.target.value)}
                    class="w-full p-2 border border-gray-300 rounded-lg box-border"
                    placeholder="سنة البدء"
                  />
                  <input
                    type="text"
                    value={exp.endYear}
                    onInput={(e) => updateExperience(index, 'endYear', e.target.value)}
                    class="w-full p-2 border border-gray-300 rounded-lg box-border"
                    placeholder="سنة الانتهاء"
                  />
                </div>
                <textarea
                  value={exp.description}
                  onInput={(e) => updateExperience(index, 'description', e.target.value)}
                  class="w-full p-2 border border-gray-300 rounded-lg box-border resize-none"
                  placeholder="وصف المسؤوليات والإنجازات"
                ></textarea>
                <button
                  class="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform box-border mt-2 self-start"
                  onClick={() => removeExperience(index)}
                >
                  إزالة
                </button>
              </div>
            </div>
          ))}
          <button
            class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform box-border"
            onClick={addExperience}
          >
            إضافة خبرة
          </button>
        </div>

        {/* Skills */}
        <div>
          <label class="block text-gray-700 font-semibold mb-2">المهارات</label>
          {skills().map((skill, index) => (
            <div class="flex items-center mb-2" key={index}>
              <input
                type="text"
                value={skill}
                onInput={(e) => updateSkill(index, e.target.value)}
                class="w-full p-2 border border-gray-300 rounded-lg box-border"
                placeholder="أدخل مهارة"
              />
              <button
                class="cursor-pointer ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform box-border"
                onClick={() => removeSkill(index)}
              >
                إزالة
              </button>
            </div>
          ))}
          <button
            class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform box-border"
            onClick={addSkill}
          >
            إضافة مهارة
          </button>
        </div>

        {/* Languages */}
        <div>
          <label class="block text-gray-700 font-semibold mb-2">اللغات</label>
          {languages().map((lang, index) => (
            <div class="flex items-center mb-2" key={index}>
              <input
                type="text"
                value={lang}
                onInput={(e) => updateLanguage(index, e.target.value)}
                class="w-full p-2 border border-gray-300 rounded-lg box-border"
                placeholder="أدخل لغة"
              />
              <button
                class="cursor-pointer ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform box-border"
                onClick={() => removeLanguage(index)}
              >
                إزالة
              </button>
            </div>
          ))}
          <button
            class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform box-border"
            onClick={addLanguage}
          >
            إضافة لغة
          </button>
        </div>

        {/* Certifications */}
        <div>
          <label class="block text-gray-700 font-semibold mb-2">الشهادات</label>
          {certifications().map((cert, index) => (
            <div class="flex items-center mb-2" key={index}>
              <input
                type="text"
                value={cert}
                onInput={(e) => updateCertification(index, e.target.value)}
                class="w-full p-2 border border-gray-300 rounded-lg box-border"
                placeholder="أدخل شهادة"
              />
              <button
                class="cursor-pointer ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform box-border"
                onClick={() => removeCertification(index)}
              >
                إزالة
              </button>
            </div>
          ))}
          <button
            class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform box-border"
            onClick={addCertification}
          >
            إضافة شهادة
          </button>
        </div>

        {/* Interests */}
        <div>
          <label class="block text-gray-700 font-semibold mb-2">الهوايات والاهتمامات</label>
          <textarea
            value={interests()}
            onInput={(e) => setInterests(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-24"
            placeholder="أدخل هواياتك واهتماماتك"
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
    </div>
  );
}

export default CVGenerator;