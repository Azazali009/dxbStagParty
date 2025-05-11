import React from "react";
import PaymentTimer from "./PaymentTimer";
import ExtendAttendeeExpiry from "../_components/ExtendAttendeeExpiry";
import ResendPaymentLink from "./ResendPaymentLink";
import ResendReminder from "../_components/ResendReminder";

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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {attendee.map(
          (attendee) => (
            // attendee.email !== booking.organizerEmail && (
            <div
              key={attendee.id}
              className={`space-y-4 ${bookingPaymentStatus === "cancelled" && "grayscale"} bg-navyBlue/50 shadow-lg ${attendee.status === "unpaid" ? "text-softGold" : "text-green-500"} rounded-lg px-6 py-10 shadow-lg`}
            >
              <ResendReminder
                status={attendee.status}
                attempts={attendee.resendIncrement}
              />
              <h1
                className={`flex items-center gap-2 text-xl font-bold md:text-xl`}
              >
                <span>Attendee:</span>
                <span className="text-base font-normal sm:text-lg">
                  {attendee?.email?.split("@")[0]}
                </span>
              </h1>
              <div className={`space-x-2 text-base tracking-wide md:text-lg`}>
                <span className="font-bold">Attendee Payment:</span>
                <span
                  className={`font-semibold capitalize ${attendee.status === "unpaid" ? "text-red-500" : "text-green-500"}`}
                >
                  {attendee.status} {attendee.status === "unpaid" ? "❌" : "✅"}
                </span>
              </div>
              {attendee.status === "unpaid" && attendee.expires_at && (
                <PaymentTimer
                  expiresAt={attendee.expires_at}
                  bookingPaymentStatus={bookingPaymentStatus}
                />
              )}
              <p>{attendee.email}</p>

              <div className="grid grid-cols-2 items-center gap-4">
                <ExtendAttendeeExpiry
                  id={attendee.id}
                  bookingPaymentStatus={bookingPaymentStatus}
                  attendeePayemntStatus={attendee.status}
                  hasExtended={attendee.has_extended}
                />
                <ResendPaymentLink
                  bookingPaymentStatus={bookingPaymentStatus}
                  bookingID={bookingID}
                  attendee={attendee}
                />
              </div>
            </div>
          ),
          // ),
        )}
      </div>
    </div>
  );
}
