"use client";

import { useActivity } from "../_context/ActivityProvider";
import ActivityCard from "./ActivityCard";
import Empty from "./Empty";

export default function ActivityGrid() {
  const { filteredActivities } = useActivity();

  if (!filteredActivities || filteredActivities.length === 0)
    return <Empty name="Activities" />;
  return (
    <div className="mx-auto w-[90%] max-w-full py-10 sm:py-20">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filteredActivities?.map((activity) => (
          <ActivityCard key={activity.div} activity={activity} />
        ))}
      </div>
    </div>
  );
}
