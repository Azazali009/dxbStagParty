import ActivityCard from "../_components/ActivityCard";
import Empty from "../_components/Empty";
import { getActivities } from "../_lib/data-services";

export const revalidate = 0;

export default async function Activities({ searchQuery }) {
  const Activities = await getActivities();
  let searchedActivities;
  searchedActivities =
    searchQuery === "all" || !searchQuery
      ? Activities
      : Activities.filter(
          (activity) =>
            activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (Array.isArray(activity.tags) &&
              activity.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase()),
              )),
        );
  if (!searchedActivities?.length) return <Empty name={"Activities"} />;
  return (
    <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {searchedActivities?.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
