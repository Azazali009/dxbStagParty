import React from "react";

export default function StatsCard({ title, count = 0 }) {
  return (
    <div className="space-y-4 rounded bg-navyBlue p-4">
      <h2 className="text-lg font-semibold capitalize">{title}</h2>
      <p className="font-medium">
        Total:{" "}
        <span className="font-normal text-matalicGold">{count}</span>{" "}
      </p>
    </div>
  );
}
