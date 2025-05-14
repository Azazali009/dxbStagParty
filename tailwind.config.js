/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  // darkMode: "class",
  extend: {
    fontFamily: {
      cinzel: ["Cinzel", "sans-serif"],
    },
    animation: {
      spotlight: "spotlight 2s ease .75s 1 forwards",
      "meteor-effect": "meteor 5s linear infinite",
    },

    boxShadow: {
      shadowOne: "10px 10px 19px #1c1e22, -10px -10px 19px #1c1e22",
    },
    colors: {
      primary: "#05172a",
      secondary: "#D4AF37",
      navyBlue: "#0B0E1C",
      charcoalBlack: "#1A1A1A",
      softGold: "#F7E7CE",
      reddish: "#2b030c",
      matalicGold: "#e0b15e",
    },
  },
};

export const plugins = [require("@tailwindcss/typography")];
