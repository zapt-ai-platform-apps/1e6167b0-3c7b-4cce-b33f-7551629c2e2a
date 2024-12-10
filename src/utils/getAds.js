import categories from '../data/categories';
import servicesCategories from '../data/servicesCategories';
import appsCategories from '../data/appsCategories';

export function getAds() {
  const ads = [];

  // Add tools from categories
  categories.forEach((category) => {
    category.tools.forEach((tool) => {
      ads.push({
        type: 'tool',
        title: tool.name,
        description: tool.description,
        buttonText: 'جرب الآن',
        toolName: tool.name,
      });
    });
  });

  // Add services from servicesCategories
  servicesCategories.forEach((category) => {
    category.services.forEach((service) => {
      ads.push({
        type: 'service',
        title: service.name,
        description: service.description,
        buttonText: 'عرض الخدمة',
        link: service.link || `/services/${encodeURIComponent(service.name)}`,
      });
    });
  });

  // Add apps from appsCategories
  appsCategories.forEach((category) => {
    category.apps.forEach((app) => {
      ads.push({
        type: 'app',
        title: app.name,
        description: app.description,
        buttonText: 'تحميل التطبيق',
        link: app.downloadLink,
      });
    });
  });

  return ads;
}