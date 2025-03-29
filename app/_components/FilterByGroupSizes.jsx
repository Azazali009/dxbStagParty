import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function FilterByGroupSizes() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("groupSize") ?? "all";
  function handleFilter(filter) {
    const params = new URLSearchParams();
    params.set("groupSize", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold capitalize">
        Filter By Group Sizes
      </h2>
      <div className="space-y-4">
        <Button
          handleFilter={handleFilter}
          filter="all"
          activeFilter={activeFilter}
        >
          all
        </Button>
        <Button
          filter="small"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          small package
        </Button>
        <Button
          handleFilter={handleFilter}
          filter="medium"
          activeFilter={activeFilter}
        >
          medium package
        </Button>
      </div>
    </div>
  );
}

function Button({ children, filter, activeFilter, handleFilter }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`flex w-full min-w-max justify-center whitespace-nowrap rounded-full border-2 border-secondary px-6 py-2 text-sm capitalize transition-all duration-300 ${
        filter === activeFilter ? "bg-secondary" : "bg-transparent"
      } hover:bg-secondary`}
    >
      {children}
    </button>
  );
}
