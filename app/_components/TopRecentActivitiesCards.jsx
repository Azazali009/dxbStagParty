"use client";
import React, { useState } from "react";

export default function TopRecentActivitiesCards({ recentTopActivities }) {
  const [viewAll, setViewAll] = useState(4);

  if (!recentTopActivities)
    return <p className="p-4 text-center">No recent activites.</p>;

  function handleViewAll() {
    setViewAll((prev) => (prev === 4 ? recentTopActivities.length : 4));
  }
  return (
    <>
      <div className="mb flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize">Activities</h2>
        <button onClick={handleViewAll} className="text-sky-500">
          View all &gt;{" "}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-[1px]">
        {recentTopActivities?.slice(0, viewAll).map((activity) => {
          return (
            <div key={activity.id} className="rounded-md bg-navyBlue px-4 py-6">
              {activity.name}
            </div>
          );
        })}
      </div>
    </>
  );
}
