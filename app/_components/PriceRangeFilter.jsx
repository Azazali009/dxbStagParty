"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DownSvg from "../svgIcons/DownSvg";
import UpSvg from "../svgIcons/UpSvg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActivity } from "../_context/ActivityProvider";

export default function PriceRange() {
  const { allActivities } = useActivity();
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Budget value from URL
  const budgetFromUrl = Number(searchParams.get("budget")) || 0;
  const [budget, setBudget] = useState(budgetFromUrl);

  // Example static min/max (aap API/DB se bhi nikal sakte ho)
  const minPrice = 0;
  const maxPrice =
    allActivities.length > 0
      ? Math.max(...allActivities.map((a) => Number(a.price) || 0))
      : 1000;

  const rangePercent = ((budget - minPrice) / (maxPrice - minPrice)) * 100;

  // Sync to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (budget > 0) {
      params.set("budget", budget.toString());
    } else {
      params.delete("budget");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [budget, pathname, router, searchParams]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false); // ✅ hide the slider
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <motion.div className="space-y-3 font-semibold">
      <button
        onClick={() => setShow((s) => !s)}
        className="flex min-h-8 w-full items-center justify-between rounded-md border border-gray-700 fill-softGold px-2 xs:min-h-12 sm:px-4"
      >
        <label className="block text-[9px] font-medium sm:text-base">
          Price Range
        </label>
        <span>{show ? <UpSvg /> : <DownSvg />}</span>
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            ref={ref}
            className="flex w-full flex-col gap-2 rounded-md bg-navyBlue px-2 py-3 sm:px-4"
            key="price-range"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={budget}
              step={10}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg disabled:cursor-not-allowed disabled:opacity-30"
              style={{
                background: `linear-gradient(to right, #bf9b30 ${rangePercent}%, white ${rangePercent}%)`,
              }}
            />
            <span className="text-xs text-white sm:text-sm">
              Range: AED <span className="text-matalicGold">{budget}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
