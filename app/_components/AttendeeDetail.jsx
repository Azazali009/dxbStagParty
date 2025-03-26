import React from "react";
import PaymentTimer from "./PaymentTimer";
import ExtendAttendeeExpiry from "@/app/_components/ExtendAttendeeExpiry";

export default function AttendeeDetail({ attendee }) {
  if (!attendee.length)
    return <p className="text-center text-red-500">No attendess found</p>;
  return (
    <>
      <h2 className="!mt-12 text-xl font-semibold">All Attendee&apos;s</h2>
      <div className="grid grid-cols-2 gap-8">
        {attendee.map(
          (attendee) => (
            // attendee.email !== booking.organizerEmail && (
            <div
              key={attendee.id}
              className={`space-y-4 bg-transparent shadow-shadowOne ${attendee.status === "unpaid" ? "text-white" : "text-green-500"} rounded-lg px-6 py-10 shadow-lg`}
            >
              <h1 className="flex items-center gap-2 text-3xl font-bold">
                <span>Attendee:</span>
                <span className="text-xl font-normal">
                  {attendee?.email?.split("@")[0]}
                </span>
              </h1>
              <div className="space-x-2 text-xl tracking-wide">
                <span className="font-bold">Attendee Payment:</span>
                <span
                  className={`font-semibold capitalize ${attendee.status === "unpaid" ? "text-red-500" : "text-secondary"}`}
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
                hasExtended={attendee.has_extended}
              />
            </div>
          ),
          // ),
        )}
      </div>
    </>
  );
}
