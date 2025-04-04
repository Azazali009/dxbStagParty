import ActivityCard from "../_components/ActivityCard";
import Empty from "../_components/Empty";
import { getActivities } from "../_lib/data-services";

export const revalidate = 0;

export default function Activities({
  searchQuery,
  groupSize,
  ActivitiesArray,
}) {
  let searchedActivities;
  searchedActivities =
    searchQuery === "all" || !searchQuery
      ? ActivitiesArray
      : ActivitiesArray.filter(
          (activity) =>
            activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (Array.isArray(activity.tags) &&
              activity.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase()),
              )),
        );

  let filteredActivities = searchedActivities.filter((activity) => {
    if (!groupSize) return true;
    const [min, max] = activity.group_size.split("-").map(Number);
    return groupSize >= min && groupSize <= max;
  });

  if (!filteredActivities?.length) return <Empty name={"Activities"} />;
  return (
    <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredActivities?.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
