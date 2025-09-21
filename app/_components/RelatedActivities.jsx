import React from "react";
import { getActivitiesByCategory } from "../_lib/data-services";
import ActivityCarousel from "./ActivityCarousel";

export default async function RelatedActivities({ category, id }) {
  const activitiesArr = await getActivitiesByCategory(category);

  const activities = activitiesArr?.filter((act) => act.id !== id);
  if (!activities || activities.length === 0) {
    return (
      <div className="space-y-6 py-14">
        <h2 className="text-center text-xl font-semibold capitalize text-softGold sm:text-5xl">
          No related activities found
        </h2>
      </div>
    );
  }
  return (
    <div className="space-y-6 py-14">
      <h2 className="text-center text-3xl font-semibold capitalize text-matalicGold xs:text-5xl">
        Related activities
      </h2>
      <ActivityCarousel Activities={activities} />
    </div>
  );
}
