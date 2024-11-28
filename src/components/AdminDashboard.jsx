import { createSignal, Show } from 'solid-js';
import UserManagement from './admin/UserManagement';
import BlogManagement from './admin/BlogManagement';

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = createSignal('user-management');

  const tabs = [
    { name: 'إدارة المستخدمين', value: 'user-management' },
    { name: 'إدارة المدونة', value: 'blog-management' },
  ];

  return (
    <main class="flex-grow px-4 h-full">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">لوحة تحكم المشرف</h2>
        <p class="text-lg mb-8">
          مرحباً بك في لوحة التحكم، يمكنك إدارة المستخدمين والمدونة من هنا.
        </p>
      </div>

      <div class="border-b border-gray-200 mb-4">
        <nav class="-mb-px flex justify-center space-x-4 space-x-reverse">
          {tabs.map((tab) => (
            <button
              class={`cursor-pointer py-4 px-6 border-b-2 font-medium text-sm ${
                selectedTab() === tab.value
                  ? 'border-primary-dark text-primary-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab(tab.value)}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div class="h-full">
        <Show when={selectedTab() === 'user-management'}>
          <UserManagement />
        </Show>
        <Show when={selectedTab() === 'blog-management'}>
          <BlogManagement />
        </Show>
      </div>

      <div class="mt-8 text-center text-gray-700">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline"
        >
          تم الإنشاء باستخدام ZAPT
        </a>
      </div>
    </main>
  );
}

export default AdminDashboard;