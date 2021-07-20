const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './public/**/*.{js,ts,jsx,tsx,html,css}',
    './src/**/*.{js,ts,jsx,tsx,html,css}',
    './config/**/*.{js,ts,jsx,tsx,html,css}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
        gray: {
          50: '#F7F7F7',
          100: '#E0E0E0',
          200: '#C9C9C9',
          300: '#B2B2B2',
          400: '#9C9C9C',
          500: '#363636',
          600: '#2E2E2E',
          700: '#262626',
          800: '#1E1E1E',
          900: '#171717',
        },
        primary: {
          100: '#cdebef',
          200: '#98d6df',
          300: '#69bfcc',
          400: '#4fa5b3',
          500: '#3b8999',
          600: '#2c6e7f',
          700: '#1e5263',
          800: '#123747',
          900: '#061b29',
        },
        red: colors.rose,
      },
    },
    fontFamily: {
      quicksand: ['Quicksand', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
}
