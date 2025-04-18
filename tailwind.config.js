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
    keyframes: {
      meteor: {
        "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
        "70%": { opacity: "1" },
        "100%": {
          transform: "rotate(215deg) translateX(-500px)",
          opacity: "0",
        },
      },
      spotlight: {
        "0%": {
          opacity: 0,
          transform: "translate(-72%, -62%) scale(0.5)",
        },
        "100%": {
          opacity: 1,
          transform: "translate(-50%,-40%) scale(1)",
        },
      },
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
export const plugins = [];
