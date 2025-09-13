import React from "react";

export default function ActivitySort({
  sort,
  setSort,
  destinationSort,
  setDestinationSort,
}) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="group_size">Group Size</label>
        <select
          name="group_size"
          id="group_size"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 rounded-md border border-gray-800 bg-navyBlue px-2 text-gray-300 outline-none focus:outline-matalicGold"
        >
          <option defaultValue={"Sort by group size"} value="">
            Sort by group size
          </option>
          <option value="asc">Low to high(2-6,6-20)</option>
          <option value="desc">High to low(6-20,2-6)</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="Destination">By Destination</label>
        <select
          name="Destination"
          id="Destination"
          value={destinationSort}
          onChange={(e) => setDestinationSort(e.target.value)}
          className="h-10 rounded-md border border-gray-800 bg-navyBlue px-2 text-gray-300 outline-none focus:outline-matalicGold"
        >
          <option defaultValue={"Sort by destination"} value="">
            Sort by destination
          </option>
          <option value="destination-asc">Ascending (A-Z)</option>
          <option value="destination-desc">Descending (Z-A)</option>
        </select>
      </div>
    </div>
  );
}
