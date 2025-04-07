import React from "react";
import PaymentTimer from "./PaymentTimer";
import ExtendAttendeeExpiry from "../_components/ExtendAttendeeExpiry";

export default function AttendeeDetail({ attendee }) {
  if (!attendee.length)
    return <p className="text-center text-red-500">No attendess found</p>;
  return (
    <div className="space-y-4">
      <h2 className="!mt-12 text-xl font-semibold">All Attendee&apos;s</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {attendee.map(
          (attendee) => (
            // attendee.email !== booking.organizerEmail && (
            <div
              key={attendee.id}
              className={`space-y-4 bg-white shadow-lg ${attendee.status === "unpaid" ? "text-primary" : "text-green-500"} rounded-lg px-6 py-10 shadow-lg`}
            >
              <h1 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
                <span>Attendee:</span>
                <span className="text-lg font-normal sm:text-xl">
                  {attendee?.email?.split("@")[0]}
                </span>
              </h1>
              <div className="space-x-2 text-base tracking-wide md:text-xl">
                <span className="font-bold">Attendee Payment:</span>
                <span
                  className={`font-semibold capitalize ${attendee.status === "unpaid" ? "text-red-500" : "text-green-500"}`}
                >
                  {attendee.status} {attendee.status === "unpaid" ? "❌" : "✅"}
                </span>
              </div>
              {attendee.status === "unpaid" && attendee.expires_at && (
                <PaymentTimer expiresAt={attendee.expires_at} />
              )}
              <p>{attendee.email}</p>

              <ExtendAttendeeExpiry
                id={attendee.id}
                attendeePayemntStatus={attendee.status}
                hasExtended={attendee.has_extended}
              />
            </div>
          ),
          // ),
        )}
      </div>
    </div>
  );
}
