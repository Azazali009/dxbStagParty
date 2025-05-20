import ClearFilterButton from "../_components/ClearFilterButton";
import DayTimeFilter from "../_components/DayTimeFilter";
import DisplayPackages from "../_components/DisplayPackages";
import PackagesHeroSection from "../_components/PackagesHeroSection";
import SliderFilter from "../_components/SliderFilter";
import Testimonilas from "../_components/Testimonials";

export const revalidate = 0;

export default async function Page({ searchParams }) {
  const filter = searchParams.groupSize ?? "all";
  return (
    <div className="mx-auto max-w-7xl">
      <PackagesHeroSection />
      <div className="relative z-20 mx-auto w-[95%] py-14 [grid-column:1/-1]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-start gap-10 rounded-md p-4 shadow-xl transition-all duration-300">
          <SliderFilter />
          <DayTimeFilter />
          <ClearFilterButton />
        </div>
      </div>
      <DisplayPackages />
      {/* <StagPartyPackages filter={filter} /> */}
      <Testimonilas />
    </div>
  );
}
