import React, { useState } from "react";
import DownSvg from "../svgIcons/DownSvg";
import { AnimatePresence, motion } from "framer-motion";
import UpSvg from "../svgIcons/UpSvg";

export default function Budget() {
  const [show, setShow] = useState(false);
  return (
    <motion.div className="space-y-3">
      <div className="flex w-full items-center justify-between fill-softGold">
        <label className="block font-medium">Budget</label>
        <button onClick={() => setShow((show) => !show)}>
          {show ? <UpSvg /> : <DownSvg />}
        </button>
      </div>
      <AnimatePresence>
        {show && (
          <motion.input
            type="text"
            placeholder="Search"
            className="h-12 rounded-md border-2 border-matalicGold bg-transparent px-4"
            key="search-form"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
