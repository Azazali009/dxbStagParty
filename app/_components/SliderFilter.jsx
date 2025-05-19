"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useActivity } from "../_context/ActivityProvider";
import DownSvg from "../svgIcons/DownSvg";
import UpSvg from "../svgIcons/UpSvg";
import { AnimatePresence, motion } from "framer-motion";

export default function SliderFilter() {
  const { groupSize, minGroupSize, maxGroupSize } = useActivity();
  const [value, setValue] = useState(minGroupSize);
  const [show, setShow] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // const handleChange = (e) => {
  //   const value = Number(e.target.value);
  //   const params = new URLSearchParams(searchParams);
  //   params.set("groupSize", value);
  //   router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  // };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("groupSize", value);
    value !== 1 &&
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, value, searchParams, router]);
  const rangePercent =
    ((groupSize - minGroupSize) / (maxGroupSize - minGroupSize)) * 100 || 0;

  return (
    <div className="space-y-3 font-semibold">
      <button
        onClick={() => setShow((s) => !s)}
        className="flex min-h-12 w-full items-center justify-between rounded-md border border-gray-700 fill-softGold px-4"
      >
        <label className="block font-medium">Group Size</label>
        <span>{show ? <UpSvg /> : <DownSvg />}</span>
      </button>

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
              value={value}
              step={1}
              onChange={(e) => setValue(e.target.value)}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg"
              style={{
                background: `linear-gradient(to right, #bf9b30 ${rangePercent}%, white ${rangePercent}%)`,
              }}
            />
            <span className="text-sm">{maxGroupSize}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
