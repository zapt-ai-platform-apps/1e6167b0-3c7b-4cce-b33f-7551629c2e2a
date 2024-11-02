import { createSignal } from 'solid-js';

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-900">
      <div class="max-w-4xl mx-auto">
        <header class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">New App</h1>
          {/* No Sign Out button needed */}
        </header>
        <main>
          <p class="text-lg">
            Welcome to New App. This application provides a platform for users to interact with various features.
          </p>
          {/* Additional content can be added here */}
        </main>
      </div>
    </div>
  );
}

export default App;