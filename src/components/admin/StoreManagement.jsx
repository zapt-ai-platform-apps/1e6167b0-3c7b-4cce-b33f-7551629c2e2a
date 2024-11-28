import { createSignal, onMount, Show, For } from 'solid-js';

function StoreManagement() {
  const [products, setProducts] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [selectedProduct, setSelectedProduct] = createSignal(null);
  const [searchText, setSearchText] = createSignal('');

  // Mock functions to simulate API calls
  const fetchProducts = async () => {
    setLoading(true);
    // Replace with actual API call
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'المنتج الأول', description: 'وصف المنتج الأول', price: 100 },
        { id: 2, name: 'المنتج الثاني', description: 'وصف المنتج الثاني', price: 200 },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleProductUpdate = async () => {
    // Implement update logic here
    alert('تم تحديث المنتج بنجاح.');
  };

  const handleProductDelete = async () => {
    const confirmation = confirm('هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذه العملية.');
    if (!confirmation) return;

    // Implement delete logic here
    setProducts(products().filter(product => product.id !== selectedProduct().id));
    setSelectedProduct(null);
    alert('تم حذف المنتج بنجاح.');
  };

  const handleProductCreate = () => {
    setSelectedProduct({ id: null, name: '', description: '', price: 0 });
  };

  const handleProductSave = async () => {
    if (selectedProduct().id) {
      // Update existing product
      handleProductUpdate();
    } else {
      // Create new product
      // Implement create logic here
      setProducts([...products(), { ...selectedProduct(), id: Date.now() }]);
      setSelectedProduct(null);
      alert('تم إنشاء المنتج بنجاح.');
    }
  };

  onMount(() => {
    fetchProducts();
  });

  const filteredProducts = () => {
    return products().filter(product => product.name.includes(searchText()));
  };

  return (
    <div>
      <h3 class="text-xl font-bold mb-4 text-primary-dark">إدارة المتجر</h3>
      <div class="flex justify-between mb-4">
        <input
          type="text"
          value={searchText()}
          onInput={(e) => setSearchText(e.target.value)}
          placeholder="ابحث عن منتج..."
          class="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
        />
        <button
          class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform box-border"
          onClick={handleProductCreate}
        >
          إضافة منتج جديد
        </button>
      </div>
      <Show when={!loading()} fallback={<p>جاري تحميل المنتجات...</p>}>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={filteredProducts()}>
            {(product) => (
              <div
                class="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleProductClick(product)}
              >
                <h4 class="font-semibold">{product.name}</h4>
                <p class="text-sm text-gray-600">السعر: {product.price} دولار</p>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Show when={selectedProduct()}>
        <div class="mt-6 p-4 border border-gray-300 rounded-lg bg-white">
          <h4 class="text-lg font-bold mb-2">{selectedProduct().id ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h4>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-1">اسم المنتج</label>
              <input
                type="text"
                value={selectedProduct().name}
                onInput={(e) => setSelectedProduct({ ...selectedProduct(), name: e.target.value })}
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-1">وصف المنتج</label>
              <textarea
                value={selectedProduct().description}
                onInput={(e) => setSelectedProduct({ ...selectedProduct(), description: e.target.value })}
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border h-32 resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-1">السعر</label>
              <input
                type="number"
                value={selectedProduct().price}
                onInput={(e) => setSelectedProduct({ ...selectedProduct(), price: parseFloat(e.target.value) })}
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
              />
            </div>
            <div class="flex space-x-4 space-x-reverse">
              <button
                class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border"
                onClick={handleProductSave}
              >
                حفظ
              </button>
              <Show when={selectedProduct().id}>
                <button
                  class="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform box-border"
                  onClick={handleProductDelete}
                >
                  حذف
                </button>
              </Show>
              <button
                class="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform box-border"
                onClick={() => setSelectedProduct(null)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default StoreManagement;