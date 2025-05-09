"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SliderFilter({
  groupSize,
  maxGroupSize,
  minGroupSize,
}) {
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
    <div className="flex flex-col gap-4 font-semibold">
      <span className="block font-medium">Group Size</span>
      <div className="flex items-center gap-2 rounded-md bg-navyBlue p-4">
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
            height: "8px",
            background: `linear-gradient(to right, #bf9b30 ${rangePercent}%, white ${rangePercent}%)`,
            borderRadius: "8px",
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
            width: 25px;
            height: 25px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            border: 4px solid #bf9b30;
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
      </div>
    </div>
  );
}
