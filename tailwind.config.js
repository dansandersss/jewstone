/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: "rgba(55, 55, 55, 1)",
        customWhite: "rgba(243, 243, 243, 1)",
        customGreen: "rgba(21, 214, 52, 1)",
        customOrange: "rgba(214, 141, 21, 1)",
        customOrangeLight: "rgba(214, 141, 21, 0.55)",
        customWhiteLight: "rgba(255, 255, 255, 0.55)",
      },
    },
  },
  plugins: [],
};
