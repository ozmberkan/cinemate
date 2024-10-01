/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        relieve: ["Relieve", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "ping-slow": "ping 5s linear infinite",
      },
      colors: {
        bgcolor: "#f9f9f9",
      },
      dropShadow: {
        "3xl": "0px 0px 50px rgba(249,188,44, 1)",
      },
      backgroundImage: {
        bg: "url('/src/assets/bg.png')",
      },
    },
  },
  plugins: [],
};
