import { createSignal, onMount, Show, For } from 'solid-js';
import { supabase } from '../../supabaseClient';

function StoreManagement() {
  const [products, setProducts] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [selectedProduct, setSelectedProduct] = createSignal(null);
  const [searchText, setSearchText] = createSignal('');
  const [message, setMessage] = createSignal('');

  const fetchProducts = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        setMessage('حدث خطأ أثناء جلب المنتجات.');
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setMessage('حدث خطأ أثناء جلب المنتجات.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setMessage('');
  };

  const handleProductUpdate = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: selectedProduct().name,
          description: selectedProduct().description,
          price: selectedProduct().price,
        })
        .eq('id', selectedProduct().id);

      if (error) {
        console.error('Error updating product:', error);
        setMessage('حدث خطأ أثناء تحديث المنتج.');
      } else {
        setMessage('تم تحديث المنتج بنجاح.');
        fetchProducts();
        setSelectedProduct(null);
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setMessage('حدث خطأ أثناء تحديث المنتج.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductDelete = async () => {
    const confirmation = confirm('هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذه العملية.');
    if (!confirmation) return;

    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', selectedProduct().id);

      if (error) {
        console.error('Error deleting product:', error);
        setMessage('حدث خطأ أثناء حذف المنتج.');
      } else {
        setMessage('تم حذف المنتج بنجاح.');
        fetchProducts();
        setSelectedProduct(null);
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setMessage('حدث خطأ أثناء حذف المنتج.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductCreate = () => {
    setSelectedProduct({ id: null, name: '', description: '', price: 0 });
    setMessage('');
  };

  const handleProductSave = async () => {
    if (!selectedProduct().name || !selectedProduct().description) {
      setMessage('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    if (selectedProduct().id) {
      // Update existing product
      handleProductUpdate();
    } else {
      // Create new product
      setLoading(true);
      setMessage('');
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([
            {
              name: selectedProduct().name,
              description: selectedProduct().description,
              price: selectedProduct().price,
              created_at: new Date(),
            },
          ]);

        if (error) {
          console.error('Error creating product:', error);
          setMessage('حدث خطأ أثناء إنشاء المنتج.');
        } else {
          setMessage('تم إنشاء المنتج بنجاح.');
          fetchProducts();
          setSelectedProduct(null);
        }
      } catch (err) {
        console.error('Error creating product:', err);
        setMessage('حدث خطأ أثناء إنشاء المنتج.');
      } finally {
        setLoading(false);
      }
    }
  };

  onMount(() => {
    fetchProducts();
  });

  const filteredProducts = () => {
    return products().filter((product) =>
      product.name.includes(searchText())
    );
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
          <h4 class="text-lg font-bold mb-2">
            {selectedProduct().id ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h4>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-1">اسم المنتج</label>
              <input
                type="text"
                value={selectedProduct().name}
                onInput={(e) =>
                  setSelectedProduct({ ...selectedProduct(), name: e.target.value })
                }
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-1">وصف المنتج</label>
              <textarea
                value={selectedProduct().description}
                onInput={(e) =>
                  setSelectedProduct({ ...selectedProduct(), description: e.target.value })
                }
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border h-32 resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-1">السعر</label>
              <input
                type="number"
                value={selectedProduct().price}
                onInput={(e) =>
                  setSelectedProduct({ ...selectedProduct(), price: parseFloat(e.target.value) })
                }
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent box-border"
              />
            </div>
            <div class="flex space-x-4 space-x-reverse">
              <button
                class={`cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform box-border ${
                  loading() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleProductSave}
                disabled={loading()}
              >
                {loading() ? 'جاري الحفظ...' : 'حفظ'}
              </button>
              <Show when={selectedProduct().id}>
                <button
                  class={`cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform box-border ${
                    loading() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleProductDelete}
                  disabled={loading()}
                >
                  {loading() ? 'جاري الحذف...' : 'حذف'}
                </button>
              </Show>
              <button
                class="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform box-border"
                onClick={() => {
                  setSelectedProduct(null);
                  setMessage('');
                }}
              >
                إلغاء
              </button>
            </div>
            <Show when={message()}>
              <p class="mt-4 text-center text-green-600 font-semibold">{message()}</p>
            </Show>
          </div>
        </div>
      </Show>
      <Show when={message() && !selectedProduct()}>
        <p class="mt-4 text-center text-green-600 font-semibold">{message()}</p>
      </Show>
    </div>
  );
}

export default StoreManagement;