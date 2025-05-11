"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DownSvg from "../svgIcons/DownSvg";
import UpSvg from "../svgIcons/UpSvg";

export default function SliderFilter() {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-3 font-semibold">
      <div className="flex w-full items-center justify-between fill-softGold">
        <label className="block font-medium">Day Time</label>
        <button onClick={() => setShow((show) => !show)}>
          {show ? <UpSvg /> : <DownSvg />}
        </button>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="flex h-12 items-center gap-2 rounded-md bg-navyBlue px-4"
            key="dayTime"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <select className="w-full border-none bg-transparent font-normal outline-none">
              <option selected value="">
                Any activity type
              </option>
            </select>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
