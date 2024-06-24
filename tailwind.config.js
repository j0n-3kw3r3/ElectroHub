const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7628C5",
        secondary: "#FA7921",
        black: "#001011",
        darkbg: "#0F0F0F",
        neutral: "#EDEDED",
        success: "#00D68F",
        error: "#FF3D71",
        warning: "#FFAA00",
        white: "#FFFFFF",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
