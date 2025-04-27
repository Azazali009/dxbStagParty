import React from "react";
import { getRecentBookings } from "../_lib/data-services";
import RecentBookingsTable from "./RecentBookingTable";
export default async function RecentBookings() {
  const recentBookings = await getRecentBookings();

  return (
    <div className="space-y-4">
      <RecentBookingsTable recentBookings={recentBookings} />
    </div>
  );
}
