function BookItem(props) {
  const { book } = props;
  const handleClick = () => {
    alert(`تم اختيار الكتاب: ${book.title}`);
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h4 class="text-lg font-semibold mb-2">{book.title}</h4>
      <p class="text-gray-700 mb-4">{book.description}</p>
      <button
        class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform box-border"
        onClick={handleClick}
      >
        قراءة المزيد
      </button>
    </div>
  );
}

export default BookItem;