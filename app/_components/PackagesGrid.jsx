"use client";
import React, { useState } from "react";
import FilterTabs from "./FilterTabs";
import PackageCard from "./PackageCard";
import Empty from "./Empty";

export default function PackagesGrid({ packages }) {
  const [filter, setFilter] = useState("all");

  if (!packages.length || !packages) return <Empty name={"Packages"} />;
  const uniqueTags = [
    "all",
    ...new Set(packages?.flatMap((pack) => pack.tags)),
  ];

  const filteredPackages =
    filter === "all"
      ? packages
      : packages.filter((pkg) => pkg.tags.includes(filter));
  return (
    <div className="mt-14 space-y-14">
      <div className="grid grid-cols-[16rem_1fr] gap-6">
        <FilterTabs
          tabs={uniqueTags}
          filter={filter}
          setFilter={setFilter}
          packages={packages}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredPackages.map((pack) => {
            return <PackageCard key={pack.id} pack={pack} />;
          })}
        </div>
      </div>
    </div>
  );
}
