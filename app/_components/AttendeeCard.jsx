import React from "react";
import PaymentTimer from "./PaymentTimer";
import ExtendAttendeeExpiry from "../_components/ExtendAttendeeExpiry";
import ResendPaymentLink from "./ResendPaymentLink";
import ResendReminder from "../_components/ResendReminder";
import Link from "next/link";

export default function AttendeeCard({
  attendee,
  bookingPaymentStatus,
  bookingID,
}) {
  return (
    <div
      key={attendee.id}
      className={`space-y-4 ${bookingPaymentStatus === "cancelled" && "grayscale"} bg-navyBlue/50 shadow-lg ${attendee.status === "unpaid" ? "text-softGold" : "text-green-500"} rounded-lg px-6 py-10 shadow-lg`}
    >
      <p className="capitalize">
        Hey,{" "}
        <span className="font-semibold text-matalicGold">{attendee?.name}</span>{" "}
        <span className="inline-block animate-wave sm:text-xl">👋</span>
      </p>
      <ResendReminder
        status={attendee.status}
        attempts={attendee.resendIncrement}
      />
      {attendee.status === "unpaid" && attendee.expires_at && (
        <PaymentTimer
          expiresAt={attendee.expires_at}
          bookingPaymentStatus={bookingPaymentStatus}
        />
      )}
      <h1
        className={`flex items-center gap-2 text-xs font-bold xs:text-base md:text-xl`}
      >
        <span>Attendee:</span>
        <span className="text-xs font-normal xs:text-base sm:text-lg">
          {attendee?.email?.split("@")[0]}
        </span>
      </h1>
      <div
        className={`space-x-2 text-xs tracking-wide xs:text-base md:text-lg`}
      >
        <span className="font-bold">Attendee Payment:</span>
        <span
          className={`font-semibold capitalize ${attendee.status === "unpaid" ? "text-red-500" : "text-green-500"}`}
        >
          {attendee.status} {attendee.status === "unpaid" ? "❌" : "✅"}
        </span>
      </div>

      <div className="space-y-2 text-xs xs:text-base">
        <Link className="block" href={`mailto:${attendee?.email}`}>
          💌 {attendee.email}
        </Link>
      </div>

      <div className="!mt-8 grid grid-cols-1 items-center gap-2 xs:grid-cols-2">
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
  );
}
