import tailwindcssRtl from 'tailwindcss-rtl';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'purple-100': '#E9D8FD',
        'blue-100': '#EBF8FF',
        'purple-600': '#805AD5',
        'purple-700': '#6B46C1',
        'blue-600': '#3182CE',
        'blue-700': '#2B6CB0',
        'green-600': '#38A169',
        'green-700': '#2F855A',
        'yellow-600': '#D69E2E',
        'yellow-700': '#B7791F',
        'red-600': '#E53E3E',
        'red-700': '#C53030',
        'gray-700': '#4A5568',
      },
    },
  },
  plugins: [
    tailwindcssRtl,
  ],
};