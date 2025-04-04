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
  const [range, setRange] = useState(groupSize); // Default value

  function handleChange(e) {
    const value = e.target.value;
    setRange(value);

    const params = new URLSearchParams(searchParams);
    params.set("groupSize", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col items-center space-y-2 font-semibold text-neutral-600">
      <span className="mb-2 block text-sm font-bold">
        Number of guests upto (25+)
      </span>

      {/* Styled Slider */}
      <input
        type="range"
        min={minGroupSize}
        max={maxGroupSize}
        value={range}
        step={1}
        onChange={handleChange}
        className="h-2 w-full appearance-none rounded-lg accent-white shadow-2xl"
        style={{
          WebkitAppearance: "none",
          appearance: "none",
          height: "8px",
          background: "linear-gradient(to right, #bf9b30, #735d1d)",
          borderRadius: "5px",
          outline: "none",
          transition: "opacity .15s ease-in-out",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
        }}
      />

      {/* Custom Handle */}
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

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid #bf9b30;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      {/* Min/Max Labels */}
      <div className="flex w-full justify-between text-sm font-bold text-neutral-500">
        <span>4</span>
        <span>{range}</span>
        <span>25</span>
      </div>
    </div>
  );
}
