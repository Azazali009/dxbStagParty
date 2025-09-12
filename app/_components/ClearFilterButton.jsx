"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import XMarkIcon from "../svgIcons/XMarkIcon";
import { useActivity } from "../_context/ActivityProvider";

export default function ClearFilterButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { groupSize, dayTime, category, budget, setBudget } = useActivity();
  function handleClear() {
    setBudget(0);
    const params = new URLSearchParams(searchParams);
    // params.delete("search");
    params.delete("groupSize");
    params.delete("timing");
    params.delete("category");
    params.delete("budget");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  if (!dayTime && !groupSize && !category && !budget) return null;
  return (
    <button
      className="flex items-center gap-1 self-center justify-self-center text-[8px] capitalize text-red-500 underline decoration-red-500 decoration-[2px] underline-offset-4 [grid-column:1/-1] hover:no-underline xs:col-span-1 sm:justify-self-start sm:text-base"
      onClick={handleClear}
    >
      <span>Clear filters X</span>{" "}
    </button>
  );
}
