import { createSignal } from 'solid-js';

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-900">
      <div class="max-w-4xl mx-auto">
        <header class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">إمكانية الوصول للمكفوفين</h1>
        </header>
        <main>
          <p class="text-lg">
            مرحبًا بك في <span class="font-bold">إمكانية الوصول للمكفوفين</span>. هذا التطبيق مخصص لتقديم التقنيات والأدوات التي تساعد المكفوفين في حياتهم اليومية.
          </p>
          {/* يمكن إضافة محتوى إضافي هنا */}
        </main>
      </div>
    </div>
  );
}

export default App;