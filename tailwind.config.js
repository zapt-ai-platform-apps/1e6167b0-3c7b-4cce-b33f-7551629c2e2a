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
          light: '#7abfff',
          DEFAULT: '#4a90e2',
          dark: '#0066cc',
        },
        secondary: {
          light: '#81ffd9',
          DEFAULT: '#50e3c2',
          dark: '#00b38f',
        },
        neutral: {
          light: '#f5f7fa',
          DEFAULT: '#9b9b9b',
          dark: '#4a4a4a',
        },
        background: {
          DEFAULT: '#f0f2f5',
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
  variants: {
    extend: {
      transform: ['hover', 'focus'],
      scale: ['active', 'group-hover'],
    },
  },
};