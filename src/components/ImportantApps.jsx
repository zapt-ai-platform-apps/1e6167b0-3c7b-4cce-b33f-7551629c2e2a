import { useNavigate } from '@solidjs/router';
import CategoriesList from './CategoriesList';
import appsCategories from '../data/appsCategories';

function ImportantApps() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    // لا توجد تطبيقات حاليًا في الفئات
    alert('هذه الفئة قيد التطوير. يرجى التحقق مرة أخرى لاحقًا.');
  };

  return (
    <main class="flex-grow px-4 h-full">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">أهم التطبيقات</h2>
        <p class="text-lg mb-8">
          اختر فئة التطبيقات التي تهمك واستمتع بمجموعة من التطبيقات المصممة خصيصًا لك.
        </p>
      </div>

      <CategoriesList
        categories={appsCategories}
        handleCategoryClick={handleCategoryClick}
        buttonText="عرض التطبيقات"
      />
    </main>
  );
}

export default ImportantApps;