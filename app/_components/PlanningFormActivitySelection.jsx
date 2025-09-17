import Image from "next/image";
import React, { useState } from "react";
import { usePartyBuilder } from "../_context/PartyBuilderProvider";

export default function PlanningFormActivitySelection({
  activities,
  categories,
}) {
  const {
    selectedActivityIds,
    setSelectedActivityIds,
    selectedCategory,
    setSelectedCategory,
  } = usePartyBuilder();
  const [hovered, setHovered] = useState(false);

  const allCategories = [
    { name: "All", slug: "all" },
    ...categories?.map((cat) => ({ name: cat.name, slug: cat.slug })),
  ];

  let filteredActivities;
  filteredActivities =
    !selectedCategory || selectedCategory === "all"
      ? activities
      : activities.filter(
          (activity) => activity.category.slug === selectedCategory,
        );

  const visibleActivities = hovered
    ? filteredActivities
    : filteredActivities.slice(0, 5);

  // handle checkbox change
  const handleCheckboxChange = (e, activityId) => {
    if (e.target.checked) {
      // Add to selected list
      setSelectedActivityIds([...selectedActivityIds, activityId]);
    } else {
      // Remove from selected list
      setSelectedActivityIds(
        selectedActivityIds.filter((id) => id !== activityId),
      );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-10">
      <h2 className="text-base font-bold text-matalicGold sm:text-3xl">
        Activity Selection:
      </h2>
      {selectedActivityIds.length > 0 && (
        <div className="mt-4 space-y-2">
          <h2 className="text-sm font-semibold sm:text-lg">
            Selected Activities Display:
          </h2>
          <ul className="flex flex-wrap gap-4">
            {selectedActivityIds.map((id) => {
              const act = activities.find((a) => a.id === id);
              return (
                <li
                  className="group flex w-full max-w-[200px] items-center gap-2 overflow-hidden rounded-lg bg-navyBlue text-xs shadow-2xl"
                  key={id}
                >
                  <div className="w-1/2 overflow-hidden">
                    <Image
                      src={act.image}
                      alt={act.name}
                      width={50}
                      height={50}
                      className="aspect-square w-full object-cover duration-300 group-hover:scale-125"
                    />
                  </div>
                  <div className="flex w-1/2 flex-col gap-2 p-2">
                    <span className="font-semibold text-neutral-500">
                      {act?.category.name}
                    </span>
                    <span className="text-[9px] leading-normal text-neutral-300 sm:text-base">
                      {act?.name}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="space-y-6">
        <h2 className="text-sm font-semibold sm:text-xl">
          Select Activities ↓
        </h2>
        <div className="mb-4 flex flex-wrap items-center gap-[2px] sm:gap-2">
          {categories &&
            categories.length > 0 &&
            allCategories?.map((category) => {
              return (
                <button
                  type="button"
                  className={`rounded-sm ${selectedCategory === category.slug ? "translate-y-1 bg-matalicGold text-navyBlue shadow-xl" : "translate-y-0 bg-navyBlue text-white shadow-none"} px-3 py-1 text-[8px] font-medium duration-300 hover:translate-y-1 hover:shadow-xl active:scale-75 sm:text-xs`}
                  onClick={() => setSelectedCategory(category.slug)}
                  key={category.slug}
                >
                  {category.name}
                </button>
              );
            })}
        </div>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="perspective-1000 relative max-w-full transform rounded-xl p-4 shadow-md transition-all duration-500 ease-in-out hover:shadow-2xl"
        >
          <h3>
            Count:{" "}
            <span className="font-bold text-matalicGold">
              {" "}
              {filteredActivities?.length || 0}
            </span>
          </h3>
          <div
            className={`no-scrollbar grid gap-2 overflow-y-auto transition-all duration-700 ${
              hovered ? "max-h-[1000px]" : "max-h-[240px] overflow-hidden"
            }`}
          >
            {visibleActivities.map((activity) => (
              <label
                htmlFor={activity.id}
                key={activity.id}
                className="flex items-center gap-2 rounded p-2 transition hover:bg-navyBlue"
              >
                <input
                  type="checkbox"
                  id={activity.id}
                  checked={selectedActivityIds.includes(activity.id)}
                  onChange={(e) => handleCheckboxChange(e, activity.id)}
                />
                <Image
                  src={activity.image}
                  alt={activity.name}
                  width={50}
                  height={50}
                  className="aspect-video rounded border border-neutral-700 object-cover sm:aspect-square"
                />
                <span className="text-[9px] sm:text-base">{activity.name}</span>
              </label>
            ))}
          </div>

          {/* Optional: Add a subtle glass shine effect */}
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-white/0 to-black/10" />
        </div>
      </div>
    </div>
  );
}
