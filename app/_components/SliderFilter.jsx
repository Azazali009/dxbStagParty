"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SliderFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [range, setRange] = useState();

  function handleChange(e) {
    const value = e.target.value; // ✅ Get the updated slider value
    setRange(value);

    const params = new URLSearchParams(searchParams);
    params.set("groupSize", value); // ✅ Use `value`, NOT `range`
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex max-w-sm flex-col gap-2">
      <label htmlFor="">Number of guest upto(25)</label>
      <input
        min={4}
        max={25}
        type="range"
        value={range}
        step={1}
        onChange={handleChange}
      />
      <div className="flex items-center gap-4">
        <span> 2</span>
        <span> 25</span>
      </div>
    </div>
  );
}
