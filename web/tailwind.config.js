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
          50: '#E8E8E9',
          100: '#D0D0D2',
          200: '#B9B9BC',
          300: '#A1A1A5',
          400: '#8A8A8F',
          500: '#5A5A5E',
          600: '#434346',
          700: '#323234',
          800: '#252527',
          900: '#161617',
        },
        primary: {
          50: '#DCDCF4',
          100: '#B8B8EA',
          200: '#9595DF',
          300: '#7272D5',
          400: '#4E4ECA',
          500: '#3131A5',
          600: '#272782',
          700: '#1C1C5E',
          800: '#12123B',
          900: '#0B0B23',
        },
        red: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
}
