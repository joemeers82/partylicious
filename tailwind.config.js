/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    extend: {
      screens: {
        "min-w-680": "680px",
        "min-w-960": "960px",
        "min-w-1200": "1200px",
        "min-w-1280": "1280px",

        "max-w-680": { max: "680px" },
        "max-w-960": { max: "960px" },
        "max-w-1200": { max: "1200px" },
        "max-w-1280": { max: "1280px" },
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
      colors: {
        lightBlue: "#55c7cf",
        partyYellow: "#fff7e1",
        lightPink: "#fff4f0",
        default: "#333",
        partyBlue: "#4fa4ad",
      },
      letterSpacing: {
        global: ".5px",
      },
      lineHeight: {
        global: "2",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover"], // Enable the hover variant for backgroundColor
    },
  },
  plugins: [],
};
