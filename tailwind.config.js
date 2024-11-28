import tailwindcssRtl from 'tailwindcss-rtl';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#B3E5FC', // أزرق فاتح
          DEFAULT: '#0288D1', // أزرق معتدل
          dark: '#01579B', // أزرق غامق
        },
        secondary: {
          light: '#C8E6C9', // أخضر فاتح
          DEFAULT: '#43A047', // أخضر معتدل
          dark: '#2E7D32', // أخضر غامق
        },
        neutral: {
          light: '#F5F5F5',
          DEFAULT: '#9E9E9E',
          dark: '#424242',
        },
      },
      fontFamily: {
        sans: ['Noto Kufi Arabic', 'Tahoma', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    tailwindcssRtl,
  ],
};