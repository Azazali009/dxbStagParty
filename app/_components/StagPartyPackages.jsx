import { Suspense } from "react";
import FilterablePackagesGrid from "./FilterablePackagesGrid";
import { getPackages } from "../_lib/packagesApi";
import Spinner from "./Spinner";

export default async function StagPartyPackages({ filter }) {
  const packages = await getPackages();
  let filteredPackages;
  if (filter === "all" || !filter) filteredPackages = packages;
  if (filter === "small")
    filteredPackages = packages.filter((pack) => {
      const [min, max] = pack.group_size.split("-").map(Number);
      return min <= 4;
    });
  if (filter === "medium")
    filteredPackages = packages.filter((pack) => {
      const [min, max] = pack.group_size.split("-").map(Number);
      return min <= 5 && max >= 7;
    });
  if (filter === "large")
    filteredPackages = packages.filter((pack) => {
      const [min, max] = pack.group_size.split("-").map(Number);
      return min >= 8;
    });

  return (
    <div className="flex flex-col justify-center gap-4 px-4 py-24">
      <h2 className="bg-gradient-to-b from-neutral-500 to-neutral-700 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-5xl">
        Our expert built stag party packages
      </h2>
      <div className="max-w-4xl">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
          inventore sequi odio! Alias, illo? Nam enim facilis quo pariatur
          impedit itaque vel omnis possimus repudiandae quae. Non aspernatur
          iure est?
        </p>
      </div>
      <Suspense fallback={<Spinner />}>
        <FilterablePackagesGrid packages={filteredPackages} filter={filter} />
      </Suspense>
    </div>
  );
}
