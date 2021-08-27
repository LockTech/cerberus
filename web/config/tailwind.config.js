const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['src/**/*.{js,ts,jsx,tsx,html,css}'],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      animation: {
        'spin-physics': 'spin 1.5s cubic-bezier(.8, .25, .2, .75) infinite',
      },
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
          900: '#01134b',
          800: '#032a83',
          700: '#0648a5',
          600: '#0b66bd',
          500: '#1183d5',
          400: '#1ca1ed',
          300: '#65bbf4',
          200: '#9ad3f8',
          100: '#cdeafb',
          50: '#E7F5FD',
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
