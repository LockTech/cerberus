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
          50: '#F4F4F6',
          100: '#E5E5EB',
          200: '#C0C0CE',
          300: '#A3A3B8',
          400: '#787891',
          500: '#5D5F79',
          600: '#43465B',
          700: '#2C2E3F',
          800: '#1F212E',
          900: '#14161F',
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
