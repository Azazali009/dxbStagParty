import DisplayPackages from "../_components/DisplayPackages";
import PackagesHeroSection from "../_components/PackagesHeroSection";
import Testimonilas from "../_components/Testimonials";
import { getPackages } from "../_lib/packagesApi";

export const revalidate = 0;

// meta data
export const metadata = {
  title: "DXB Stag Party - Packages",
  description:
    "Explore DXB Stag Party packages with customizable options to create the perfect Dubai celebration for you and your friends.",
};

export default async function Page({ searchParams }) {
  const packages = await getPackages();
  const filter = searchParams.groupSize ?? "all";

  return (
    <div className="mx-auto max-w-full">
      <PackagesHeroSection />
      {/* <div className="relative z-20 mx-auto w-[95%] py-14 [grid-column:1/-1]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-start gap-10 rounded-md p-4 shadow-xl transition-all duration-300">
          <SliderFilter />
          <DayTimeFilter />
          <ClearFilterButton />
        </div>
      </div> */}
      <DisplayPackages packages={packages} />
      {/* <StagPartyPackages filter={filter} /> */}
      <Testimonilas />
    </div>
  );
}
