import ClearFilterButton from "./ClearFilterButton";
import SliderFilter from "./SliderFilter";
import SearchBar from "./SearchBar";

export default function ActivityFilter({ searchQuery }) {
  return (
    <div className="space-y-2 rounded-md border border-tertiary p-4 [grid-column:1/-1]">
      <SearchBar />
      <SliderFilter />
      {searchQuery && searchQuery !== "all" && <ClearFilterButton />}
    </div>
  );
}
