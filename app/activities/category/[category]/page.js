import React from "react";
import {
  getActivities,
  getActivitiesByCategory,
} from "../../../_lib/data-services";
import ActivityCard from "../../../_components/ActivityCard";
import Empty from "../../../_components/Empty";

export const revalidate = 0;
export async function generateStaticParams() {
  const activities = await getActivities();

  const uniqueCategories = [
    ...new Set(activities.map((curActivity) => String(curActivity.category))),
  ];

  return uniqueCategories.map((category) => ({ category }));
}
export default async function Page({ params }) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const activities = await getActivitiesByCategory(decodedCategory);

  if (!activities.length) return <Empty name={"Activities"} />;
  return (
    // <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
    <div className="grid grid-cols-4 gap-4 p-8">
      {activities?.map((activity) => {
        return <ActivityCard key={activity.id} activity={activity} />;
      })}
    </div>
  );
}
