/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,tsx,ts,tsx}",
    "./components/**/*.{js,tsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
