import { createSignal } from 'solid-js';

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-900">
      <div class="max-w-4xl mx-auto">
        <header class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">Blind Accessibility</h1>
        </header>
        <main>
          <p class="text-lg">
            Welcome to <span class="font-bold">Blind Accessibility</span>. This application is dedicated to providing technologies and tools to assist the visually impaired in their daily lives. Explore our features to enhance independence and connect with innovative solutions tailored for you.
          </p>
          {/* Additional content can be added here */}
        </main>
      </div>
    </div>
  );
}

export default App;