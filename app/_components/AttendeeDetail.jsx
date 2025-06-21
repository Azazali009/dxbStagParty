import React from "react";
import AttendeeCard from "../_components/AttendeeCard";

export default function AttendeeDetail({
  attendee,
  bookingPaymentStatus,
  bookingID,
}) {
  if (!attendee.length)
    return <p className="text-center text-red-500">No attendess found</p>;
  return (
    <div className="space-y-4">
      <h2 className="!mt-12 text-xl font-semibold">All Attendee&apos;s</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {attendee.map(
          (attendee) => (
            // attendee.email !== booking.organizerEmail && (
            <AttendeeCard
              key={attendee.id}
              attendee={attendee}
              bookingID={bookingID}
              bookingPaymentStatus={bookingPaymentStatus}
            />
          ),
          // ),
        )}
      </div>
    </div>
  );
}
