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
    <div className="flex flex-col items-center gap-4 font-semibold">
      <span className="mb-2 block text-sm font-light">
        Number of guests upto (25+)
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
          background: `linear-gradient(to right, #bf9b30 ${rangePercent}%, #0B0E1C ${rangePercent}%)`,
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

      <div className="flex w-full justify-between text-sm font-bold text-neutral-400">
        <span>{minGroupSize}</span>
        <span>{range}</span>
        <span>{maxGroupSize}</span>
      </div>
    </div>
  );
}
