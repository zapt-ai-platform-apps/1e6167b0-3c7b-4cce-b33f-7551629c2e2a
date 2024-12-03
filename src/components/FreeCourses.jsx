import { createSignal, Show, For } from 'solid-js';

function FreeCourses() {
  const [courses] = createSignal([
    {
      name: 'دورة التسويق الرقمي',
      description: 'اكتشف استراتيجيات التسويق الرقمي وكيفية تطبيقها بشكل فعال.',
    },
  ]);

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

      <Show when={courses().length > 0} fallback={
        <p class="text-center text-gray-700">لا توجد دورات متاحة حاليًا. يرجى التحقق مرة أخرى لاحقًا.</p>
      }>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <For each={courses()}>
            {(course) => (
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
            )}
          </For>
        </div>
      </Show>
    </main>
  );
}

export default FreeCourses;