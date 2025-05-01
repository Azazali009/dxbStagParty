import Link from "next/link";
import React from "react";
import EyeIcon from "../svgIcons/EyeIcon";
import TrashIcon from "../svgIcons/TrashIcon";
import PencilIcon from "../svgIcons/PencilIcon";
import { format } from "date-fns";
import { formatToAED } from "../_lib/helpers";

export default function BookingRow({ booking }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_2fr_1fr_1fr] items-center justify-center border border-gray-800 bg-navyBlue px-4 py-3 text-sm font-light last:rounded-b-md">
      <p>#{booking.id}</p>
      <p>{formatToAED(booking.totalPrice)} </p>
      <p>{format(booking.created_at, " MMM dd yyyy")} </p>
      <p> {booking.users.email} </p>
      {booking.paymentStatus === "pending" && (
        <p
          className={
            "bg-tertiary max-w-28 rounded-full bg-gray-800 py-1 text-center text-xs font-semibold capitalize tracking-wide text-gray-400"
          }
        >
          {booking.paymentStatus}
        </p>
      )}
      {booking.paymentStatus === "completed" && (
        <p
          className={
            "max-w-28 rounded-full bg-green-300 px-4 py-1 text-center text-xs font-semibold capitalize tracking-wide text-green-900"
          }
        >
          {booking.paymentStatus}
        </p>
      )}
      {booking.paymentStatus === "cancelled" && (
        <p
          className={
            "max-w-28 rounded-full bg-red-300 px-4 py-1 text-center text-xs font-semibold capitalize tracking-wide text-red-900"
          }
        >
          {booking.paymentStatus}
        </p>
      )}
      <div className="flex items-center gap-2 justify-self-center">
        {/* <Link
          className="fill-matalicGold"
          href={`/dashboard/bookings/${booking.id}`}
          title="View Booking"
        >
          <EyeIcon />
        </Link> */}
        <button className="fill-red-600 hover:opacity-70">
          <TrashIcon />
        </button>
        <Link
          href={`/dashboard/bookings/${booking.id}`}
          className="fill-blue-500 hover:opacity-80"
        >
          <PencilIcon />
        </Link>
      </div>
    </div>
  );
}
