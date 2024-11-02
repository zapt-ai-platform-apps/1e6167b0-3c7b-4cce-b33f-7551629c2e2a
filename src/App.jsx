import { createSignal } from 'solid-js';

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-900">
      <div class="max-w-4xl mx-auto">
        <header class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">تطبيق جديد</h1>
          {/* لا حاجة لزر تسجيل الخروج */}
        </header>
        <main>
          <p class="text-lg">
            مرحبًا بك في تطبيق جديد. يوفر هذا التطبيق منصة للمستخدمين للتفاعل مع ميزات متنوعة.
          </p>
          {/* يمكن إضافة محتوى إضافي هنا */}
        </main>
      </div>
    </div>
  );
}

export default App;