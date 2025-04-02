import ActivityCard from "../_components/ActivityCard";
import Empty from "../_components/Empty";
import { getActivities } from "../_lib/data-services";

export const revalidate = 0;
export default async function Activities() {
  const Activities = await getActivities();
  if (!Activities.length) return <Empty name={"Activities"} />;
  return (
    <div className="mx-auto grid grid-cols-1 items-center gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
      {Activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
