module.exports = {
  purge: [
    './public/**/*.{js,ts,jsx,tsx,html,css}',
    './src/**/*.{js,ts,jsx,tsx,html,css}',
    './config/**/*.{js,ts,jsx,tsx,html,css}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
}
