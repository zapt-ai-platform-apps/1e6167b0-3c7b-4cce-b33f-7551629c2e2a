import { Show } from 'solid-js';

function PageSelector(props) {
  const { processAllPages, setProcessAllPages, pageCount, selectedPages, setSelectedPages } = props;

  const handlePageSelectionChange = (e) => {
    setProcessAllPages(e.target.value === 'all');
  };

  const handleSelectedPagesChange = (e) => {
    const pages = e.target.value
      .split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n) && n > 0 && n <= pageCount());
    setSelectedPages(pages);
  };

  return (
    <div class="mt-4">
      <label class="block text-gray-700 font-semibold mb-2">اختر الصفحات المراد استخراج النص منها:</label>
      <div class="flex items-center space-x-4 space-x-reverse">
        <label class="flex items-center space-x-2 space-x-reverse">
          <input
            type="radio"
            name="pageOption"
            value="all"
            checked={processAllPages()}
            onChange={handlePageSelectionChange}
            class="cursor-pointer"
          />
          <span>كل الصفحات</span>
        </label>
        <label class="flex items-center space-x-2 space-x-reverse">
          <input
            type="radio"
            name="pageOption"
            value="custom"
            checked={!processAllPages()}
            onChange={handlePageSelectionChange}
            class="cursor-pointer"
          />
          <span>صفحات محددة</span>
        </label>
      </div>
      <Show when={!processAllPages()}>
        <div class="mt-2">
          <input
            type="text"
            placeholder="أدخل أرقام الصفحات (مثال: 1,3,5)"
            onInput={handleSelectedPagesChange}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          />
        </div>
      </Show>
    </div>
  );
}

export default PageSelector;