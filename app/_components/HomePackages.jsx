"use client";

import PackageCard from "./PackageCard";

export default function HomePackages({ packages }) {
  return (
    <section className="mt-12 grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="mb-8 space-y-3 text-center [grid-column:1/-1]">
        <h2 className="bg-gradient-to-b from-neutral-500 to-neutral-700 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl md:text-5xl">
          Explore our Packages
        </h2>
        <p className="text-neutral-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, enim.
        </p>
      </div>
      {packages.slice(0, 3).map((pack) => (
        <PackageCard key={pack.id} pack={pack} />
      ))}
    </section>
  );
}
