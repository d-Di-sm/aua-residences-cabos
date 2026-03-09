/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Calibri Light", "Calibri", "sans-serif"],
        sans: ["Calibri Light", "Calibri", "sans-serif"],
      },
    },
  },
  plugins: [],
};
