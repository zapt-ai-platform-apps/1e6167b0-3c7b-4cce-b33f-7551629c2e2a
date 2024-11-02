import { createSignal } from 'solid-js';

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-900" dir="rtl">
      <div class="max-w-4xl mx-auto">
        <header class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">Blind Accessibility</h1>
        </header>
        <main>
          <p class="text-lg mb-4">
            مرحبًا بك في <span class="font-bold">Blind Accessibility</span>. هدفنا نشر الوعي التقني وتقديم كل ما يحتاجه المكفوفون في مكان واحد.
          </p>
          <p class="text-lg">
            استكشف ميزاتنا لتعزيز الاستقلالية والتواصل مع حلول مبتكرة مصممة خصيصًا لك. نعمل جاهدين لتقديم أفضل الأدوات والخدمات التي تساعدك في حياتك اليومية.
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;