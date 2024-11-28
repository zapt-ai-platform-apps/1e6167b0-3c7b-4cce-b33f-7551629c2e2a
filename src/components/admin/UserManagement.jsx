import { createSignal, onMount, Show, For } from 'solid-js';
import { supabase } from '../../supabaseClient';

function UserManagement() {
  const [users, setUsers] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [selectedUser, setSelectedUser] = createSignal(null);
  const [searchText, setSearchText] = createSignal('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/getUsers', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      const result = await response.json();
      if (response.ok) {
        setUsers(result.users);
      } else {
        setError(result.error || 'حدث خطأ أثناء جلب المستخدمين.');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('حدث خطأ أثناء جلب المستخدمين.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setError('');
    setMessage('');
  };

  const handleUserUpdate = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedUser().id,
          email: selectedUser().email,
          user_metadata: selectedUser().user_metadata
        })
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('تم تحديث المستخدم بنجاح.');
      } else {
        setError(result.error || 'حدث خطأ أثناء تحديث المستخدم.');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError('حدث خطأ أثناء تحديث المستخدم.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserDelete = async () => {
    const confirmation = confirm('هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذه العملية.');
    if (!confirmation) return;

    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/deleteUser', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedUser().id
        })
      });
      const result = await response.json();
      if (response.ok) {
        setUsers(users().filter(user => user.id !== selectedUser().id));
        setSelectedUser(null);
        setMessage('تم حذف المستخدم بنجاح.');
      } else {
        setError(result.error || 'حدث خطأ أثناء حذف المستخدم.');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('حدث خطأ أثناء حذف المستخدم.');
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchUsers();
  });

  const filteredUsers = () => {
    return users().filter(user => {
      const fullName = user.user_metadata.full_name || '';
      const email = user.email || '';
      const search = searchText().toLowerCase();
      return fullName.toLowerCase().includes(search) || email.toLowerCase().includes(search);
    });
  };

  return (
    <div>
      <h3 class="text-xl font-bold mb-4 text-primary-dark">إدارة المستخدمين</h3>
      <div class="mb-4">
        <input
          type="text"
          value={searchText()}
          onInput={(e) => setSearchText(e.target.value)}
          placeholder="ابحث عن مستخدم..."
          class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
        />
      </div>
      <Show when={!loading()} fallback={<p>جاري تحميل المستخدمين...</p>}>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={filteredUsers()}>
            {(user) => (
              <div
                class="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleUserClick(user)}
              >
                <p class="font-semibold">{user.user_metadata.full_name || 'اسم غير معروف'}</p>
                <p class="text-sm text-gray-600">{user.email}</p>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Show when={selectedUser()}>
        <div class="mt-6 p-4 border border-gray-300 rounded-lg bg-white">
          <h4 class="text-lg font-bold mb-2">تعديل معلومات المستخدم</h4>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-1">الاسم الكامل</label>
              <input
                type="text"
                value={selectedUser().user_metadata.full_name}
                onInput={(e) => setSelectedUser({ ...selectedUser(), user_metadata: { ...selectedUser().user_metadata, full_name: e.target.value } })}
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={selectedUser().email}
                onInput={(e) => setSelectedUser({ ...selectedUser(), email: e.target.value })}
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
              />
            </div>
            {/* يمكن إضافة المزيد من الحقول حسب الحاجة */}
            <div class="flex space-x-4 space-x-reverse">
              <button
                class={`cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleUserUpdate}
                disabled={loading()}
              >
                {loading() ? 'جاري التحديث...' : 'تحديث'}
              </button>
              <button
                class={`cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleUserDelete}
                disabled={loading()}
              >
                {loading() ? 'جاري الحذف...' : 'حذف'}
              </button>
            </div>
          </div>
          <Show when={error()}>
            <p class="mt-4 text-center text-red-600">{error()}</p>
          </Show>
          <Show when={message()}>
            <p class="mt-4 text-center text-green-600 font-semibold">{message()}</p>
          </Show>
        </div>
      </Show>
      <Show when={error() && !selectedUser()}>
        <p class="mt-4 text-center text-red-600">{error()}</p>
      </Show>
      <Show when={message() && !selectedUser()}>
        <p class="mt-4 text-center text-green-600 font-semibold">{message()}</p>
      </Show>
    </div>
  );
}

export default UserManagement;