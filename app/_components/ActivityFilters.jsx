import ClearFilterButton from "./ClearFilterButton";
import SliderFilter from "./SliderFilter";
import SearchBar from "./SearchBar";

export default function ActivityFilter({
  searchQuery,
  groupSize,
  maxGroupSize,
  minGroupSize,
}) {
  return (
    <div className="relative z-20 mx-auto w-[95%] overflow-hidden py-14 [grid-column:1/-1]">
      <div className="grid grid-cols-4 items-center gap-6 rounded-md border border-gray-800 p-4">
        <SearchBar />
        <SliderFilter
          minGroupSize={minGroupSize}
          maxGroupSize={maxGroupSize}
          groupSize={groupSize}
        />

        <div className="space-y-3">
          <label className="block font-medium" htmlFor="">
            Budget
          </label>
          <input
            type="text"
            placeholder="Search"
            className="h-12 rounded-md border-2 border-matalicGold bg-transparent px-4"
          />
        </div>
        {(groupSize || (searchQuery && searchQuery !== "all")) && (
          <ClearFilterButton />
        )}
      </div>
    </div>
  );
}
