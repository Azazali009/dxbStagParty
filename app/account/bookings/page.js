import React from "react";
import { format } from "date-fns";
// import PencilIcon from "../../svgIcons/PencilIcon";
import TrashIcon from "../../svgIcons/TrashIcon";
import { auth } from "../../_lib/auth";
import { getBookingByUserId } from "../../_lib/data-services";
import { formatToAED } from "../../_lib/helpers";
import Link from "next/link";
// import Empty from "../../_components/Empty";

export default async function Page() {
  const { user } = await auth();

  const bookings = await getBookingByUserId(user?.userId);
  if (!bookings.length || !user)
    return (
      <div className="mx-auto my-7 text-center">You have no bookings yet.</div>
    );
  return (
    <div className="space-y-4">
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
                    <Link href={`/bookings/${booking.id}`}>
                      <h3 className="flex flex-col gap-[2px] text-sm font-semibold capitalize">
                        {booking.activities?.slice(0, 2)?.map((act) => {
                          return <span key={act.name}>{act.name}</span>;
                        })}
                        <span>...</span>
                      </h3>
                    </Link>
                    <p className="text-base font-semibold capitalize">
                      Destination:{" "}
                      <span className="font-medium">
                        {booking.destinations}
                      </span>
                    </p>

                    <div className="flex items-center gap-2">
                      <strong className="text-lg font-semibold text-secondary">
                        {formatToAED(booking.totalPrice)}
                      </strong>
                      <p>&bull;</p>
                      <p>{booking.attendeeEmails?.length} attendees</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-between">
                    <strong
                      className={`block self-end px-3 py-1 text-sm font-semibold capitalize tracking-wider text-green-100 ${booking.paymentStatus === "completed" ? "bg-green-600" : "bg-red-600"}`}
                    >
                      {booking.paymentStatus}
                    </strong>
                    <p className="text-sm font-semibold text-[#4d5053]">
                      Booked {format(booking.created_at, " EEE, MMM dd yyyy,p")}
                    </p>
                  </div>
                </div>
              </div>
              {/* divider */}
              <div className="h-[120px] w-px self-center bg-neutral-800"></div>
              <div className="flex flex-col gap-2 self-center">
                <button className="flex flex-1 items-center gap-2 fill-red-600 px-4 text-sm font-medium capitalize hover:opacity-70">
                  {" "}
                  <TrashIcon />
                  <span>delete</span>{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
