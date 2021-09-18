module.exports = {
  presets: [require('@locktech/atomic/preset')],
  purge: ['src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
}
