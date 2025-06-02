/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];

export const theme = {
  // darkMode: "class",

  extend: {
    screens: {
      xs: "480px",
    },
    keyframes: {
      wave: {
        "0%": { transform: "rotate(0deg)" },
        "15%": { transform: "rotate(14deg)" },
        "30%": { transform: "rotate(-8deg)" },
        "40%": { transform: "rotate(14deg)" },
        "50%": { transform: "rotate(-4deg)" },
        "60%": { transform: "rotate(10deg)" },
        "70%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(0deg)" },
      },
    },
    animation: {
      wave: "wave 1.6s ease-in-out infinite",
    },
    fontFamily: {
      cinzel: ["Cinzel", "sans-serif"],
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
