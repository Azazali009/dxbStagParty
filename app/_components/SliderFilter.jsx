"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DownSvg from "../svgIcons/DownSvg";
import UpSvg from "../svgIcons/UpSvg";
import { AnimatePresence, motion } from "framer-motion";
export default function SliderFilter({
  groupSize,
  maxGroupSize,
  minGroupSize,
}) {
  const [show, setShow] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [range, setRange] = useState(groupSize);

  const handleChange = (e) => {
    const value = e.target.value;
    setRange(value);

    const params = new URLSearchParams(searchParams);
    params.set("groupSize", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // % fill for dynamic gradient
  const rangePercent =
    ((range - minGroupSize) / (maxGroupSize - minGroupSize)) * 100;

  return (
    <div className="space-y-3 font-semibold">
      <div className="flex w-full items-center justify-between fill-softGold">
        <label className="block font-medium">Group Size</label>
        <button onClick={() => setShow((show) => !show)}>
          {show ? <UpSvg /> : <DownSvg />}
        </button>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            className="flex h-12 items-center gap-2 rounded-md bg-navyBlue px-4"
            key="slider"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <span className="text-nowrap text-sm font-normal">
              {minGroupSize} guest
            </span>
            <input
              type="range"
              min={minGroupSize}
              max={maxGroupSize}
              value={range}
              step={1}
              onChange={handleChange}
              className="h-2 w-full appearance-none rounded-lg"
              style={{
                WebkitAppearance: "none",
                appearance: "none",
                height: "5px",
                background: `linear-gradient(to right, #bf9b30 ${rangePercent}%, white ${rangePercent}%)`,
                borderRadius: "5px",
                outline: "none",
                transition: "opacity .15s ease-in-out",
                // boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              }}
            />

            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 25px;
                height: 25px;
                background: white;
                border-radius: 50%;
                cursor: pointer;
                border: 4px solid #bf9b30;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              }
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                background: white;
                border-radius: 50%;
                cursor: pointer;
                border: 3px solid #bf9b30;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              }
              input[type="range"]::-webkit-slider-thumb:hover {
                background: #e5d7ac;
              }
              input[type="range"]::-moz-range-thumb:hover {
                background: #e5d7ac;
              }
            `}</style>
            <span className="text-sm">{maxGroupSize}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
