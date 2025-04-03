import Activities from "@/app/_components/Activities";
import Spinner from "@/app/_components/Spinner";
import AnimatedHeading from "../_components/AnimatedHeading";
import { Suspense } from "react";
import ActivityFilters from "../_components/ActivityFilters";

export const revalidate = 0;

export default async function Page({ searchParams }) {
  const searchQuery = searchParams?.search ?? "all";
  const groupSize = Number(searchParams?.groupSize ?? null);

  return (
    <div className="min-h-screen space-y-20 px-2 antialiased sm:p-6">
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
      <ActivityFilters searchQuery={searchQuery} />

      <Suspense fallback={<Spinner />}>
        <Activities searchQuery={searchQuery} groupSize={groupSize} />
      </Suspense>
    </div>
  );
}
