module.exports = {
  purge: [
    './public/**/*.{js,ts,jsx,tsx,html,css}',
    './src/**/*.{js,ts,jsx,tsx,html,css}',
    './config/**/*.{js,ts,jsx,tsx,html,css}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  mode: 'JIT',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
