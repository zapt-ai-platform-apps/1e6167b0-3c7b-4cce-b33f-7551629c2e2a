function ToolNotAvailable({ navigate }) {
  return (
    <div class="text-center mt-8">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">الأداة غير متوفرة</h2>
      <p class="text-lg mb-6">عذراً، الأداة التي طلبتها غير متوفرة حالياً.</p>
      <button
        class="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border"
        onClick={() => navigate(-1)}
      >
        الرجوع
      </button>
    </div>
  );
}

export default ToolNotAvailable;