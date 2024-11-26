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
          light: '#E3F2FD',
          DEFAULT: '#64B5F6',
          dark: '#1976D2',
        },
        secondary: {
          light: '#E8F5E9',
          DEFAULT: '#81C784',
          dark: '#388E3C',
        },
        neutral: {
          light: '#F5F5F5',
          DEFAULT: '#9E9E9E',
          dark: '#424242',
        },
      },
      fontFamily: {
        sans: ['Tahoma', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    tailwindcssRtl,
  ],
};