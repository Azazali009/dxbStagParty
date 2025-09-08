"use client";
import React from "react";
import BookingsActions from "../_adminComponents/BookingsActions";
import PaymentProgressBar from "../_adminComponents/PaymentProgressBar";
import BookingTable from "./BookingTable";
import AttendeeDetail from "./AttendeeDetail";
import { useSupabaseSubscription } from "../_hooks/useSupabaseSubscription";
import BookingNote from "./BookingNote";

export default function Booking({ booking, bookingID, curUser, attendees }) {
  useSupabaseSubscription({ table: "booking", filterKey: bookingID });
  return (
    <div className="space-y-14 p-1.5 py-8 xs:p-4">
      <BookingsActions booking={booking} curUser={curUser} />
      <PaymentProgressBar
        bookingPaymentStatus={booking.paymentStatus}
        attendee={attendees}
      />
      <div className="space-y-4">
        <BookingTable booking={booking} attendee={attendees} />
        <BookingNote BookingNote={booking.booking_notes} />
      </div>
      <AttendeeDetail
        bookingPaymentStatus={booking.paymentStatus}
        attendee={attendees}
        bookingID={bookingID}
      />
    </div>
  );
}
