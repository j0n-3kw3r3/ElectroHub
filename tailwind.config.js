const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#453081",
      secondary: "#060607",
      neutral: "#EDEDED",
      success: "#00D68F",
      error: "#FF3D71",
      warning: "#FFAA00",
      white: "#FFFFFF",
      black: "#000000",
    },

    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
