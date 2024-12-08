import { For } from 'solid-js';

function Features(props) {
  const { appTitle, features } = props;

  return (
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">
        لماذا {appTitle}؟
      </h2>
      <p class="text-lg text-center text-gray-700 mb-8">
        {appTitle} هو تطبيق مصمم خصيصًا للمكفوفين وضعاف البصر، يوفر مجموعة من الخدمات
        والأدوات في واجهة سهلة الاستخدام ومتوافقة مع قارئات الشاشة.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <For each={features}>
          {(feature) => (
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
              <img
                src="PLACEHOLDER"
                alt={feature}
                {...{ 'data-image-request': `Icon representing ${feature}` }}
                class="w-16 h-16 mx-auto mb-4"
              />
              <p class="text-center text-gray-800 font-semibold">{feature}</p>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}

export default Features;