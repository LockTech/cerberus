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
        gray: {
          50: '#F7F7F7',
          100: '#E0E0E0',
          200: '#C9C9C9',
          300: '#B2B2B2',
          400: '#9C9C9C',
          500: '#5C5C5C',
          600: '#474747',
          700: '#2E2E2E',
          800: '#1E1E1E',
          900: '#171717',
        },
        green: colors.emerald,
        primary: {
          50: '#E7F5FD',
          100: '#cdeafb',
          200: '#9ad3f8',
          300: '#65bbf4',
          400: '#1ca1ed',
          500: '#1183d5',
          600: '#0b66bd',
          700: '#0648a5',
          800: '#032a83',
          900: '#01134b',
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
