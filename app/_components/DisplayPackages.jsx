"use client";
import PackageCard from "./PackageCard";

export default function DisplayPackages({ packages }) {
  return (
    <section className="bg-navyBlue pt-14 sm:pt-40">
      <div className="mx-auto w-[95%]">
        <div className="flex flex-col items-center gap-2 text-center sm:gap-4">
          <h2 className="text-2xl font-semibold uppercase xs:text-4xl sm:text-5xl">
            exclusive packages
          </h2>
          <p className="text-[9px] xs:text-sm sm:text-base">
            All-in-one experiences crafted for the ultimate stag celebration.
          </p>
        </div>

        <div className="!mt-10 grid grid-cols-1 items-start gap-8 sm:!mt-20">
          {/* card 1 */}
          {packages.map((pack, index) => {
            return <PackageCard key={pack.id} pack={pack} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
}
