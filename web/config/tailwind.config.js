const colors = require('tailwindcss/colors')

module.exports = {
  presets: [require('@locktech/atomic/preset')],
  purge: ['src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    extend: {
      animation: {
        'spin-physics': 'spin 1.5s cubic-bezier(.75, .25, .25, .75) infinite',
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
}
