/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./first-page/*.html"],   // ✅ match all HTML files
  theme: {
    extend: {
      fontFamily: {
        roslindale: ['"Roslindale Display Condensed Medium"', 'serif'],
      },
    },
  },
  plugins: [],
};
