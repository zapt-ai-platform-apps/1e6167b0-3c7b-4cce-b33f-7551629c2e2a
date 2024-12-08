function EditSiteForm(props) {
  return (
    <div class="p-4">
      <h3 class="text-lg font-bold mb-2 text-purple-600">تعديل الموقع باستخدام الذكاء الاصطناعي</h3>
      <textarea
        value={props.editInstructions()}
        onInput={(e) => props.setEditInstructions(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-32 mb-4"
        placeholder="أدخل التعليمات الخاصة بالتعديلات التي تريدها..."
      ></textarea>
      <button
        class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${
          props.loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={props.handleEditSite}
        disabled={props.loading()}
      >
        {props.loading() ? 'جاري التعديل...' : 'تعديل الموقع'}
      </button>
    </div>
  );
}

export default EditSiteForm;