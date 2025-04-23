import ActivityCard from "../_components/ActivityCard";
import Empty from "../_components/Empty";
import Fuse from "fuse.js";

export const revalidate = 0;

export default function Activities({
  searchQuery,
  groupSize,
  ActivitiesArray,
}) {
  // 🔍 Optional Synonym Mapping
  const synonymMap = {
    luxurious: "luxury",
    adventureous: "adventure",
    hiking: "trekking",
    campig: "camping",
  };

  // Normalize search term
  const normalizedQuery = searchQuery
    ? synonymMap[searchQuery.toLowerCase()] || searchQuery.toLowerCase()
    : "";

  // 🔍 Fuzzy search setup
  const fuse = new Fuse(ActivitiesArray, {
    keys: ["name", "tags", "description"],
    threshold: 0.3,
  });

  // 🔍 Run fuzzy search or return all
  const searchedActivities =
    !normalizedQuery || normalizedQuery === "all"
      ? ActivitiesArray
      : fuse.search(normalizedQuery).map((res) => res.item);

  // 👥 Filter by group size
  const filteredActivities = searchedActivities.filter((activity) => {
    if (!groupSize) return true;
    const [min, max] = activity.group_size.split("-").map(Number);
    return groupSize >= min && groupSize <= max;
  });

  // ❌ No results
  if (!filteredActivities?.length) return <Empty name="Activities" />;

  // ✅ Render cards
  return (
    <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-10 p-4 md:grid-cols-2 lg:grid-cols-4">
      {filteredActivities?.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
