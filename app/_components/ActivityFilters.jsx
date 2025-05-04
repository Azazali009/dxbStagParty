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
      <div className="relative flex h-10 w-[40%] items-center overflow-hidden rounded-md rounded-bl-none bg-secondary px-6">
        <h3 className="text-2xl capitalize text-white">
          {" "}
          <strong className="font-bold uppercase">online</strong> booking
        </h3>
        <div className="absolute -right-16 bottom-0 z-10 h-[50px] w-40 translate-x-0 rotate-45 bg-primary"></div>
      </div>
      <div className="grid grid-cols-3 items-center gap-6 rounded-md rounded-l-none rounded-bl-md border-2 border-secondary p-4">
        <SearchBar />
        <SliderFilter
          minGroupSize={minGroupSize}
          maxGroupSize={maxGroupSize}
          groupSize={groupSize}
        />
        {(groupSize || (searchQuery && searchQuery !== "all")) && (
          <ClearFilterButton />
        )}
      </div>
    </div>
  );
}
