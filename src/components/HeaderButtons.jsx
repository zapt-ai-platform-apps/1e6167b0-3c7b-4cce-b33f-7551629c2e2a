function HeaderButtons(props) {
  return (
    <div class="flex justify-between items-center p-4 bg-gray-100">
      <div class="flex space-x-4 space-x-reverse">
        <button
          class="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border"
          onClick={props.handleBack}
        >
          الرجوع
        </button>
        <button
          class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform box-border"
          onClick={props.handleRegenerate}
        >
          إعادة الإنشاء
        </button>
        <button
          class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border"
          onClick={() => props.setEditing(!props.editing())}
        >
          {props.editing() ? 'إلغاء' : 'تعديل الموقع'}
        </button>
        <button
          class="cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform box-border"
          onClick={props.handleDownloadSite}
        >
          تحميل الموقع
        </button>
      </div>
    </div>
  );
}

export default HeaderButtons;