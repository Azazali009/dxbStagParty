import React, { useState } from "react";
import DownSvg from "../svgIcons/DownSvg";
import { AnimatePresence, motion } from "framer-motion";
import UpSvg from "../svgIcons/UpSvg";

export default function Budget() {
  const [show, setShow] = useState(false);
  return (
    <motion.div className="space-y-3">
      <button
        onClick={() => setShow((show) => !show)}
        className="flex min-h-12 w-full items-center justify-between rounded-md border border-gray-700 fill-softGold px-4"
      >
        <label className="block font-medium">Activity Type</label>
        <span>{show ? <UpSvg /> : <DownSvg />}</span>
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            className="flex h-12 w-full items-center gap-2 rounded-md bg-navyBlue px-4"
            key="dayTime"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <select className="w-full border-none bg-transparent font-normal outline-none">
              <option selected value="">
                Activity Type Adrenaline
              </option>
            </select>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
