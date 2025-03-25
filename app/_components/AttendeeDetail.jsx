import React from "react";
import PaymentTimer from "./PaymentTimer";

export default function AttendeeDetail({ attendee }) {
  if (!attendee.length)
    return <p className="text-center text-red-500">No attendess found</p>;
  return (
    <>
      <h2 className="!mt-12 text-xl font-semibold">All Attendee&apos;s</h2>
      <div className="grid grid-cols-4 gap-x-4">
        {attendee.map(
          (attendee) => (
            // attendee.email !== booking.organizerEmail && (
            <div
              key={attendee.id}
              className={`space-y-2 bg-transparent text-sm shadow-shadowOne ${attendee.status === "unpaid" ? "text-white" : "text-green-500"} rounded-lg px-6 py-10 shadow-lg`}
            >
              {attendee.status === "unpaid" && attendee.expires_at && (
                <PaymentTimer expiresAt={attendee.expires_at} />
              )}
              <p className="tracking-wide">{attendee.email}</p>

              <div className="space-x-2 tracking-wide">
                <span className="">Status:</span>
                <span className="">
                  {attendee.status} {attendee.status === "unpaid" ? "❌" : "✅"}
                </span>
              </div>
            </div>
          ),
          // ),
        )}
      </div>
    </>
  );
}
