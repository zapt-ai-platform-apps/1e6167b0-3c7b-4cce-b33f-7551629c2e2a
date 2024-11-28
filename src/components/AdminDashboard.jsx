import { createSignal, Show } from 'solid-js';

function AdminDashboard() {
  const [selectedOption, setSelectedOption] = createSignal('');

  const handleSelectionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <main class="flex-grow px-4">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">لوحة تحكم المشرف</h2>
        <p class="text-lg mb-8">
          مرحباً بك في لوحة التحكم، يمكنك إدارة المستخدمين، المدونة، والمتجر من هنا.
        </p>
      </div>

      <div class="mb-8 flex justify-center">
        <select
          value={selectedOption()}
          onInput={handleSelectionChange}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
        >
          <option value="">اختر ما تريد إدارته</option>
          <option value="user-management">إدارة المستخدمين</option>
          <option value="blog-management">إدارة المدونة</option>
          <option value="store-management">إدارة المتجر</option>
        </select>
      </div>

      <div>
        <Show when={selectedOption() === 'user-management'}>
          <p class="text-center">هنا يمكنك إدارة المستخدمين.</p>
        </Show>
        <Show when={selectedOption() === 'blog-management'}>
          <p class="text-center">هنا يمكنك إدارة المدونة.</p>
        </Show>
        <Show when={selectedOption() === 'store-management'}>
          <p class="text-center">هنا يمكنك إدارة المتجر.</p>
        </Show>
      </div>
    </main>
  );
}

export default AdminDashboard;