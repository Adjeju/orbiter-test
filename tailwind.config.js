/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-secondary": "rgba(10, 10, 10, 1)",
        muted: "rgba(146, 146, 146, 1)",
      },
      screens: {
        "3xl": "1700px",
      },
    },
  },
  plugins: [],
};
