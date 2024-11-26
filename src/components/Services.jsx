function Services() {
  return (
    <main class="h-full">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">خدماتنا</h2>
        <p class="text-lg mb-8">
          اكتشف مجموعة الخدمات التي نقدمها لتعزيز استقلاليتك وتسهيل حياتك اليومية.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-2 text-purple-600">خدمة 1</h3>
          <p class="text-gray-700">
            وصف مختصر لخدمة 1 وكيف يمكن أن تفيد المستخدمين.
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-2 text-purple-600">خدمة 2</h3>
          <p class="text-gray-700">
            وصف مختصر لخدمة 2 وكيف يمكن أن تفيد المستخدمين.
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-2 text-purple-600">خدمة 3</h3>
          <p class="text-gray-700">
            وصف مختصر لخدمة 3 وكيف يمكن أن تفيد المستخدمين.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Services;