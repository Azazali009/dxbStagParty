import React from "react";
import ActivityRow from "../_components/ActivityRow";

export default function ActivityList({ Activities }) {
  return (
    <>
      <div className="grid grid-cols-8 justify-items-center border border-b-0 border-white/5 bg-navyBlue py-3 text-sm">
        <p></p>
        <p>Name</p>
        <p>Price</p>
        <p>Duration</p>
        <p>Destination</p>
        <p>Group Size</p>
        <p className="col-span-2">Action</p>
      </div>
      {Activities.map((activity) => (
        <ActivityRow key={activity.id} activity={activity} />
      ))}
    </>
  );
}
