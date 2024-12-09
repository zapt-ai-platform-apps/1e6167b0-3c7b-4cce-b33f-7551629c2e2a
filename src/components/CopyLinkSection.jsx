import { Show } from 'solid-js';

function CopyLinkSection(props) {
  const { appLink, copySuccess, handleCopyLink } = props;

  return (
    <div class="text-center mb-4">
      <p class="text-lg mb-2">هذا هو رابط المشاركة في صفحة شارك التطبيق</p>
      <div class="flex items-center justify-center">
        <input
          type="text"
          value={appLink}
          readOnly
          class="w-full md:w-1/2 p-2 border border-gray-300 rounded-l-lg focus:outline-none box-border"
        />
        <button
          class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition duration-300 ease-in-out transform"
          onClick={handleCopyLink}
        >
          نسخ الرابط
        </button>
      </div>
      <Show when={copySuccess()}>
        <p class="text-green-600 mt-2">{copySuccess()}</p>
      </Show>
    </div>
  );
}

export default CopyLinkSection;