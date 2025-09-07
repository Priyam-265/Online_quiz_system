/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./second-page/*.html"],   // ✅ match all HTML files
  theme: {
    extend: {
      fontFamily: {
        roslindale: ['"Roslindale Display Condensed Medium"', 'serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-glow-white': {
          textShadow: '0 0 5px white, 0 0 10px white, 0 0 20px white',
        },
        '.text-glow-black': {
          textShadow: '0 0 5px #000, 0 0 10px #000, 0 0 20px #000',
        },
      })
    }
  ],
};
