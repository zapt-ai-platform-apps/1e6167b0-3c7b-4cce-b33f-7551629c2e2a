import { useNavigate } from '@solidjs/router';

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      name: 'دورات تدريبية مجانية',
      description: 'انضم لدوراتنا التدريبية المجانية لتحسين مهاراتك.',
      link: '/services/free-courses',
    },
  ];

  const handleServiceClick = (service) => {
    if (service.link) {
      navigate(service.link);
    }
  };

  return (
    <main class="flex-grow px-4 h-full">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark">خدماتنا المجانية</h2>
        <p class="text-lg mb-8">
          اكتشف مجموعة الخدمات المجانية التي نقدمها لتعزيز استقلاليتك وتسهيل حياتك اليومية.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <h3 class="text-xl font-bold mb-2 text-primary-dark">{service.name}</h3>
            <p class="text-gray-700 mb-4">
              {service.description}
            </p>
            <button
              class="cursor-pointer px-4 py-2 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition duration-300 ease-in-out transform hover:scale-105 box-border"
              onClick={() => handleServiceClick(service)}
            >
              عرض الخدمة
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Services;