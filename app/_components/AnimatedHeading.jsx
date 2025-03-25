"use client";

import { motion } from "framer-motion";
import { cn } from "../_lib/utils";

export default function AnimatedHeading({ children, className }) {
  return (
    <motion.h1
      className={cn(
        "bg-opacity-50 bg-gradient-to-b from-secondary via-[#c5a545] to-[#392e0e] bg-clip-text text-center text-4xl font-bold !leading-[1.2] text-transparent md:text-7xl",
        className,
      )}
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.h1>
  );
}
