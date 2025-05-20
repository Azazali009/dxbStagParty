"use client";
import ActivityType from "./ActivityType";
import ClearFilterButton from "./ClearFilterButton";
import DayTimeFilter from "./DayTimeFilter";
import SliderFilter from "./SliderFilter";

export default function ActivityFilter() {
  return (
    <div className="relative z-20 mx-auto w-[95%] py-14 [grid-column:1/-1]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-start gap-10 rounded-md p-4 shadow-xl transition-all duration-300">
        <SliderFilter />
        <DayTimeFilter />
        <ActivityType />
        <ClearFilterButton />
      </div>
    </div>
  );
}
