import Activities from "@/app/_components/Activities";
import Spinner from "@/app/_components/Spinner";
import AnimatedHeading from "../_components/AnimatedHeading";
import { Suspense } from "react";
import ActivityFilters from "../_components/ActivityFilters";
import { getActivities } from "../_lib/data-services";

export const revalidate = 0;

export default async function Page({ searchParams }) {
  const searchQuery = searchParams?.search ?? "all";
  const groupSize = Number(searchParams?.groupSize ?? 0);
  const extractMinMax = (groupSize) => {
    const [min, max] = groupSize.split("-").map(Number);
    return { min, max };
  };
  const ActivitiesArray = await getActivities();

  // Get min & max across all activities
  const allSizes = ActivitiesArray.map((activity) =>
    extractMinMax(activity.group_size),
  );
  const minGroupSize = Math.min(...allSizes.map((size) => size.min));
  const maxGroupSize = Math.max(...allSizes.map((size) => size.max));

  return (
    <div className="mx-auto min-h-screen max-w-7xl space-y-20 bg-gray-100 px-2 antialiased sm:p-6">
      <div className="space-y-4">
        <AnimatedHeading className={"text-nowrap pt-16 text-xl sm:text-wrap"}>
          {" "}
          Epic Stag Do Activities
        </AnimatedHeading>
        <p className="text-center text-neutral-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, ad!
        </p>
      </div>
      {/* <SearchBar searchQuery={searchQuery} /> */}
      <ActivityFilters
        minGroupSize={minGroupSize}
        maxGroupSize={maxGroupSize}
        searchQuery={searchQuery}
        groupSize={groupSize}
      />

      <Suspense fallback={<Spinner />} key={groupSize}>
        <Activities
          ActivitiesArray={ActivitiesArray}
          searchQuery={searchQuery}
          groupSize={groupSize}
        />
      </Suspense>
    </div>
  );
}
