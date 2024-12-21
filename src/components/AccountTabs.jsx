import { Show, For } from 'solid-js';

function OverviewTab(props) {
  const { userData } = props;

  return (
    <div class="space-y-4">
      <div class="flex items-center">
        <span class="w-32 text-gray-700 font-semibold">الإسم الكامل:</span>
        <span class="text-gray-900">{userData()?.user_metadata.full_name}</span>
      </div>
      <div class="flex items-center">
        <span class="w-32 text-gray-700 font-semibold">اسم المستخدم:</span>
        <span class="text-gray-900">{userData()?.user_metadata.username}</span>
      </div>
      <div class="flex items-center">
        <span class="w-32 text-gray-700 font-semibold">الجنس:</span>
        <span class="text-gray-900">{userData()?.user_metadata.gender}</span>
      </div>
      <div class="flex items-center">
        <span class="w-32 text-gray-700 font-semibold">الدولة:</span>
        <span class="text-gray-900">{userData()?.user_metadata.country}</span>
      </div>
    </div>
  );
}

function EditProfileTab(props) {
  const {
    fullName,
    setFullName,
    username,
    setUsername,
    gender,
    setGender,
    country,
    setCountry,
    genders,
    countries,
    loading,
    handleUpdateProfile,
  } = props;

  return (
    <div class="space-y-4">
      <div>
        <label class="block text-gray-700 font-semibold mb-2">الإسم الكامل</label>
        <input
          type="text"
          value={fullName()}
          onInput={(e) => setFullName(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">اسم المستخدم</label>
        <input
          type="text"
          value={username()}
          onInput={(e) => setUsername(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">الجنس</label>
        <select
          value={gender()}
          onInput={(e) => setGender(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
        >
          <option value="">اختر الجنس</option>
          <For each={genders}>
            {(item) => (
              <option value={item}>{item}</option>
            )}
          </For>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">الدولة</label>
        <select
          value={country()}
          onInput={(e) => setCountry(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent cursor-pointer"
        >
          <option value="">اختر الدولة</option>
          <For each={countries}>
            {(item) => (
              <option value={item}>{item}</option>
            )}
          </For>
        </select>
      </div>
      <button
        class={`cursor-pointer px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform w-full ${
          loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleUpdateProfile}
        disabled={loading()}
      >
        {loading() ? 'جاري التحديث...' : 'حفظ التغييرات'}
      </button>
    </div>
  );
}

function ChangePasswordTab(props) {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handlePasswordChange,
  } = props;

  return (
    <div class="space-y-4">
      <div>
        <label class="block text-gray-700 font-semibold mb-2">كلمة المرور الجديدة</label>
        <input
          type="password"
          value={newPassword()}
          onInput={(e) => setNewPassword(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
          placeholder="أدخل كلمة المرور الجديدة"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">تأكيد كلمة المرور الجديدة</label>
        <input
          type="password"
          value={confirmPassword()}
          onInput={(e) => setConfirmPassword(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
          placeholder="أعد كتابة كلمة المرور الجديدة"
        />
      </div>
      <button
        class={`cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform w-full ${
          loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handlePasswordChange}
        disabled={loading()}
      >
        {loading() ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
      </button>
    </div>
  );
}

export { OverviewTab, EditProfileTab, ChangePasswordTab };