"use client";
import ClearFilterButton from "./ClearFilterButton";
import SliderFilter from "./SliderFilter";
import DayTimeFilter from "./DayTimeFilter";
import Budget from "./Budget";
import SearchBar from "./SearchBar";
import DownSvg from "../svgIcons/DownSvg";
import { useState } from "react";

export default function ActivityFilter({
  searchQuery,
  groupSize,
  maxGroupSize,
  minGroupSize,
}) {
  return (
    <div className="relative z-20 mx-auto w-[95%] overflow-hidden py-14 [grid-column:1/-1]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-start gap-10 rounded-md border border-gray-800 p-4 transition-all duration-300">
        <SearchBar />
        <DayTimeFilter />
        <SliderFilter
          minGroupSize={minGroupSize}
          maxGroupSize={maxGroupSize}
          groupSize={groupSize}
        />
        <Budget />
        {(groupSize || (searchQuery && searchQuery !== "all")) && (
          <ClearFilterButton />
        )}
      </div>
    </div>
  );
}
