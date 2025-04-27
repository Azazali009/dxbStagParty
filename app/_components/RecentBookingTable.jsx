"use client";

import { useState } from "react";

export default function RecentBookingTable({ recentBookings }) {
  const [viewBookings, setViewBookings] = useState(2);
  if (!recentBookings)
    return <p className="p-4 text-center">No recent bookings.</p>;

  function handleViewAll() {
    setViewBookings((prev) => (prev === 2 ? recentBookings.length : 2));
  }
  return (
    <>
      <div className="mb flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize">Recent bookings</h2>
        <button onClick={handleViewAll} className="text-sky-500">
          View all &gt;{" "}
        </button>
      </div>
      <div className="overflow-hidden rounded-md border border-b-0 border-white/5">
        <div className="grid grid-cols-5 justify-items-center bg-navyBlue py-2 text-sm">
          <p className="">Booking ID</p>
          <p className="col-span-2">organizer</p>
          <p>Supplier</p>
          <p>Payment</p>
          <p></p>
        </div>
        {recentBookings?.slice(0, viewBookings)?.map((booking) => {
          return (
            <div
              key={booking.id}
              className="grid grid-cols-5 items-center justify-items-center border-b border-white/5 bg-transparent px-2 py-2 text-sm"
            >
              <p className="">#{booking.id}</p>
              <p className="col-span-2">{booking.organizerEmail}</p>
              <p>{booking?.supplier || "Not assigned yet"}</p>
              <p
                className={`rounded-md px-2 py-1.5 capitalize text-white ${booking.paymentStatus === "completed" ? "bg-green-500" : "bg-navyBlue"}`}
              >
                {booking.paymentStatus}
              </p>
              <p></p>
            </div>
          );
        })}
      </div>
    </>
  );
}
