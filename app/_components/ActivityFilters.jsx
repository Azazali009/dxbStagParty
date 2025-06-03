"use client";
import ActivityType from "./ActivityType";
import ClearFilterButton from "./ClearFilterButton";
import DayTimeFilter from "./DayTimeFilter";
import SliderFilter from "./SliderFilter";

export default function ActivityFilter() {
  return (
    <div className="relative z-10 mx-auto [grid-column:1/-1] xs:py-14 sm:w-[95%]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-start gap-2 rounded-md p-2 shadow-xl transition-all duration-300 xs:gap-4 xs:p-4 sm:gap-10">
        <SliderFilter />
        <DayTimeFilter />
        <ActivityType />
        <ClearFilterButton />
      </div>
    </div>
  );
}
