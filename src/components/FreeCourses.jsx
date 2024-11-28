import { createSignal } from 'solid-js';

function FreeCourses() {
  const courses = [
    {
      name: 'مقدمة في البرمجة',
      description: 'تعلم أساسيات البرمجة ولغات البرمجة الشائعة.',
    },
    {
      name: 'تطوير تطبيقات الويب',
      description: 'تعرف على كيفية بناء مواقع وتطبيقات الويب باستخدام أحدث التقنيات.',
    },
    {
      name: 'دورة مهارات التواصل',
      description: 'حسّن مهاراتك في التواصل والعرض التقديمي.',
    },
    // يمكنك إضافة المزيد من الدورات هنا
  ];

  const handleEnroll = (courseName) => {
    alert(`تم تسجيلك في دورة "${courseName}". سنتواصل معك قريبًا.`);
  };

  return (
    <main class="flex-grow px-4">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">دورات تدريبية مجانية</h2>
        <p class="text-lg">
          انضم إلى دوراتنا التدريبية المجانية وطور مهاراتك في مختلف المجالات!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 class="text-xl font-bold mb-2 text-primary-dark">{course.name}</h3>
            <p class="text-gray-700 mb-4">{course.description}</p>
            <button
              class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border"
              onClick={() => handleEnroll(course.name)}
            >
              الاشتراك في الدورة
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default FreeCourses;