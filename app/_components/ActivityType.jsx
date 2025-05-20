"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DownSvg from "../svgIcons/DownSvg";
import UpSvg from "../svgIcons/UpSvg";
import { useActivity } from "../_context/ActivityProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ActivityType() {
  const [show, setShow] = useState(false);
  const { categoryOptions } = useActivity();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category"); // ✅ remove from URL if empty
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setShow(false);
  };

  return (
    <motion.div className="space-y-3 font-semibold">
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
            key="category"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <select
              className="w-full border-none bg-navyBlue p-2 font-normal capitalize text-white outline-none"
              value={selectedCategory}
              onChange={handleChange}
            >
              <option value="">Select activity type</option>
              {categoryOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
