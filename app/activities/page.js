import Activities from "../_components/Activities";
import Spinner from "../_components/Spinner";
import ActivityHeroSection from "../_components/ActivityHeroSection";
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
    <div className="mx-auto min-h-screen max-w-full space-y-20 px-2 antialiased sm:p-6">
      <ActivityHeroSection />
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
