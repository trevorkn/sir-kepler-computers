/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sofia: ['"Sofia Sans Extra Condensened"', 'sans-serif'],
        imperial: ['"Imperial Script"', 'cursive'],
        solitero: ['solitero', 'cursive']
      },
      animation: {
        'scroll-left' : 'scrollLeft 20s linear infinite',
      },
      keyframes: {
        scrollLeft: {
          '0%': {transform: 'translateX(100%)'},
          '100%': {transform: 'translateX(-100%)'},
        },
      },
    },
  },
  plugins: [],
}
