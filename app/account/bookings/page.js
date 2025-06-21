import React from "react";
import { format } from "date-fns";
// import PencilIcon from "../../svgIcons/PencilIcon";
import TrashIcon from "../../svgIcons/TrashIcon";

import { getBookingByUserId } from "../../_lib/data-services";
import { formatToAED } from "../../_lib/helpers";
import Link from "next/link";
import { getCurrentUser } from "../../_lib/getCurrentUser";

export default async function Page() {
  const user = await getCurrentUser();

  const bookings = await getBookingByUserId(user?.id);
  if (!bookings.length || !user)
    return (
      <div className="mx-auto my-7 text-center">You have no bookings yet.</div>
    );
  return (
    <div className="space-y-4 py-10 lg:py-0">
      <h1 className="text-2xl font-semibold">My bookings</h1>
      <div className="space-y-4">
        {bookings.map((booking) => {
          return (
            <div
              key={booking.id}
              className="flex rounded-md border border-gray-800"
            >
              <div className="flex-1 p-4">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <Link href={`/account/bookings/${booking.id}`}>
                      <h3 className="flex flex-col gap-[2px] text-xs font-semibold capitalize sm:text-sm">
                        {booking.activities?.slice(0, 2)?.map((act) => {
                          return <span key={act.name}>{act.name}</span>;
                        })}
                        <span>...</span>
                      </h3>
                    </Link>
                    <p className="text-xs font-semibold capitalize sm:text-base">
                      Destination:{" "}
                      <span className="font-medium">
                        {booking.destinations}
                      </span>
                    </p>

                    <div className="flex items-center gap-2">
                      <strong className="text-base font-semibold text-secondary sm:text-lg">
                        {formatToAED(booking.totalPrice)}
                      </strong>
                      <p>&bull;</p>
                      <p>{booking.attendeeEmails?.length} attendees</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-between">
                    <strong
                      className={`block self-end px-3 py-1 text-xs font-semibold capitalize tracking-wider text-green-100 sm:text-sm ${booking.paymentStatus === "completed" ? "bg-green-600" : "bg-red-600"}`}
                    >
                      {booking.paymentStatus}
                    </strong>
                    <p className="text-[9px] font-semibold text-[#4d5053] sm:text-sm">
                      Booked {format(booking.created_at, " EEE, MMM dd yyyy,p")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
