// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withAnimations } = require("animated-tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = withAnimations({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {},
      keyframes: {},
      boxShadow: {
        modal: "0px 0px 40px rgba(189, 193, 203, 0.77);",
      },
      colors: {
        red: {
          DEFAULT: "#FF764A",
        },
        pink: { DEFAULT: "#FFD1F8" },
        yellow: {
          DEFAULT: "#F7FF9C",
          1: "#F7FF9C",
          2: "#FFFCAB",
        },
        orange: {
          DEFAULT: "#FF9900",
        },
        blue: {
          DEFAULT: "#46A6FF",
          1: "#43C8FF",
          2: "#B9DDFF",
        },
        brown: {
          DEFAULT: "#e2c26e",
          2: "#9c9789",
        },
        black: {
          DEFAULT: "#000000",
        },
        gray: {
          100: "#191F28",
          200: "#223359",
          300: "#42454E",
          400: "#565656",
          500: "#626C79",
          600: "#8B94A0",
          700: "#9DA6BA",
          800: "#B2BCD0",
          900: "#DCE1EC",
          1000: "#E8EBF2",
          1100: "#F4F6F9",
        },
        white: {
          DEFAULT: "#ffffff",
          100: "#FDFDFD",
        },
      },
    },
  },
  plugins: [],
});
