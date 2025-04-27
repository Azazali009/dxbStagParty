"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import XMarkIcon from "../svgIcons/XMarkIcon";

export default function ClearFilterButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleClear() {
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("groupSize");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <button
      className="flex items-center gap-1 capitalize text-red-500 underline decoration-red-500 decoration-[2px] underline-offset-4 hover:no-underline"
      onClick={handleClear}
    >
      <span>Clear filters X</span>{" "}
    </button>
  );
}
