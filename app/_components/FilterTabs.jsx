"use client";
import FilterByTags from "../_components/FilterByTags";
import FilterByGroupSizes from "../_components/FilterByGroupSizes";

export default function Tabs({ tabs, filter, setFilter }) {
  return (
    // <ul className="scrollbar-hide tab-design mx-auto hidden w-full max-w-5xl snap-x snap-mandatory justify-start gap-4 !overflow-x-auto px-4 lg:flex">
    <div className="space-y-16 border-r-2 border-tertiary/50 pr-6">
      <FilterByGroupSizes />
      <FilterByTags tabs={tabs} filter={filter} setFilter={setFilter} />
    </div>
  );
}
