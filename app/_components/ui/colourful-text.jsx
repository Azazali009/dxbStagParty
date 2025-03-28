"use client";
import React from "react";
import { motion } from "motion/react";

export default function ColourfulText({ text }) {
  const colors = [
    "#bf9b30",
    "#997c26",
    "#d2b96e",
    "#fff1c1",
    "#bf9b30",
    "#d9c383",
    "#ccaf59",
    "#c5a545",
    "#ac8c2b",
    "#bf9b30",
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{
        y: 0,
      }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="inline-block whitespace-pre text-center text-3xl font-semibold tracking-tight sm:text-5xl"
    >
      {char}
    </motion.span>
  ));
}
