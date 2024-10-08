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
      boxShadow: {
        insett: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  plugins: [],
};
