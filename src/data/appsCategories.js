import appCategoriesData from './appCategoriesData';
import appsData from './appsData';

const appsCategories = appCategoriesData.map((category) => ({
  ...category,
  apps: appsData[category.id] || [],
}));

export default appsCategories;