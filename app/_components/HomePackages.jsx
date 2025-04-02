"use client";

import PackageCard from "./PackageCard";

export default function HomePackages({ packages }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
      <h2 className="mb-8 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-2xl font-bold text-transparent [grid-column:1/-1] sm:text-3xl md:text-5xl">
        Explore our Packages
      </h2>
      {packages.slice(0, 3).map((pack) => (
        <PackageCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
}
