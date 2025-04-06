"use client";
import React, { useState } from "react";
import FilterTabs from "./FilterTabs";
import PackageCard from "./PackageCard";
import Empty from "./Empty";
import PackagesDisplay from "./PackagesDisplay";

export default function PackagesGrid({ packages }) {
  const [filter, setFilter] = useState("all");

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
      <div className="grid grid-cols-[16rem_1fr] items-start gap-6">
        <FilterTabs
          tabs={uniqueTags}
          filter={filter}
          setFilter={setFilter}
          packages={packages}
        />

        <PackagesDisplay filteredPackages={filteredPackages} />
      </div>
    </div>
  );
}
