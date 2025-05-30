import React from "react";
import { getActivitiesByCategory } from "../_lib/data-services";
import ActivityCard from "./ActivityCard";

export default async function RelatedActivities({ category, id }) {
  const activitiesArr = await getActivitiesByCategory(category);
  const activities = activitiesArr?.filter((act) => act.id !== id);
  if (!activities || activities.length === 0) {
    return (
      <div className="space-y-6 py-14">
        <h2 className="text-center text-5xl font-semibold capitalize text-matalicGold">
          No related activities found
        </h2>
      </div>
    );
  }
  return (
    <div className="space-y-6 py-14">
      <h2 className="text-center text-5xl font-semibold capitalize text-matalicGold">
        Related activities
      </h2>
      <div className="grid grid-cols-4 gap-4 p-8">
        {activities?.map((activity) => {
          return <ActivityCard key={activity.id} activity={activity} />;
        })}
      </div>
    </div>
  );
}
