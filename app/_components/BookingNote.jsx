import React from "react";

export default function BookingNote({ BookingNote }) {
  if (!BookingNote || BookingNote === "") return;
  return (
    <div className="w-fit space-x-2 rounded-md border border-neutral-700 p-2 text-xs text-yellow-600 xs:p-4 xs:text-base">
      <strong>Booking Notes:</strong>
      <span>{BookingNote}</span>
    </div>
  );
}
