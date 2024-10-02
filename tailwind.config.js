/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        changa: ["Changa", "sans-serif"],
      },
      dropShadow: {
        "3xl": "0px 0px 70px rgb(251, 21, 44)",
      },
    },
  },
  plugins: [],
};
