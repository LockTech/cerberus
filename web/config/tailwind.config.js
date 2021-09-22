module.exports = {
  presets: [require('@locktech/atomic/preset')],
  purge: ['src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
}
