"use client";
import FilterByTags from "../_components/FilterByTags";
import FilterByGroupSizes from "../_components/FilterByGroupSizes";

export default function Tabs({ tabs, filter, setFilter }) {
  return (
    <div className="sticky top-4 space-y-16 border-r border-gray-200 pr-6">
      <FilterByGroupSizes />
      <FilterByTags tabs={tabs} filter={filter} setFilter={setFilter} />
    </div>
  );
}
