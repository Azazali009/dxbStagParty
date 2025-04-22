import React from "react";
import StatsCard from "./StatsCard";
import { getActivities, getBookings } from "../_lib/data-services";
import { getPackages } from "../_lib/packagesApi";

export default async function AdminStats() {
  const totalActivities = (await getActivities()).length;
  const totalPackages = (await getPackages()).length;
  const totalBookings = (await getBookings()).length;

  return (
    <div className="grid grid-cols-4 gap-6">
      <StatsCard title={"Activities"} count={totalActivities} />
      <StatsCard title={"Experiences"} count={0} />
      <StatsCard title={"packages"} count={totalPackages} />
      <StatsCard title={"Bookings"} count={totalBookings} />
    </div>
  );
}
