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
        amber: colors.amber,
        gray: colors.warmGray,
      },
    },
  },
  variants: {
    extend: {},
  },
}
