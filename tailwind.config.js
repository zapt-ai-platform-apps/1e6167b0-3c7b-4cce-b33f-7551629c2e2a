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
          light: '#B3E5FC',
          DEFAULT: '#0288D1',
          dark: '#01579B',
        },
        secondary: {
          light: '#C8E6C9',
          DEFAULT: '#43A047',
          dark: '#2E7D32',
        },
        neutral: {
          light: '#F5F5F5',
          DEFAULT: '#9E9E9E',
          dark: '#424242',
        },
        yellow: {
          100: '#FFF8E1',
          400: '#FFCA28',
          500: '#FFC107',
          600: '#FFB300',
          800: '#F57F17',
        },
        background: {
          DEFAULT: '#F9FAFB',
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