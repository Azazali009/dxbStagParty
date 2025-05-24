"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DownSvg from "../svgIcons/DownSvg";
import UpSvg from "../svgIcons/UpSvg";
import { useActivity } from "../_context/ActivityProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DayTimeFilter() {
  const [show, setShow] = useState(false);
  const { dayTimeOptions } = useActivity();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedDayTime = searchParams.get("timing") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("timing", value); // set timing query
    } else {
      params.delete("timing"); // ✅ remove timing query if value is empty
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setShow(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 font-semibold">
      <button
        onClick={() => setShow((show) => !show)}
        className="flex min-h-12 w-full items-center justify-between rounded-md border border-gray-700 fill-softGold px-4"
      >
        <label className="block text-xs font-medium sm:text-base">
          Day / Night
        </label>
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
            <select
              className="w-full border-none bg-navyBlue p-2 text-xs font-normal capitalize text-white outline-none sm:text-base"
              value={selectedDayTime || "default"}
              onChange={handleChange}
            >
              <option value="">select time</option>
              {dayTimeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
