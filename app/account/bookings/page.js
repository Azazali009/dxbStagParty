import React from "react";
import { format } from "date-fns";
// import PencilIcon from "../../svgIcons/PencilIcon";
import TrashIcon from "../../svgIcons/TrashIcon";
import { auth } from "../../_lib/auth";
import { getBookingByOrganizer } from "../../_lib/data-services";
import { formatToAED } from "../../_lib/helpers";
// import Empty from "../../_components/Empty";

export default async function Page() {
  const { user } = await auth();
  const bookings = await getBookingByOrganizer(user?.email);
  if (!bookings.length)
    return (
      <div className="mx-auto my-7 text-center">You have no bookings yet.</div>
    );
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-primary">My bookings</h1>
      <div className="space-y-4">
        {bookings.map((booking) => {
          return (
            <div key={booking.id} className="flex border border-gray-300">
              <div className="flex-1 p-4">
                <div className="flex justify-between text-[#4d5053]">
                  <div className="space-y-2">
                    <h3 className="flex flex-col gap-[2px] text-sm font-semibold capitalize">
                      {booking.activities?.slice(0, 2)?.map((act) => {
                        return <span key={act.name}>{act.name}</span>;
                      })}
                      <span>...</span>
                    </h3>
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
              <div className="flex flex-col gap-2 border-l border-gray-300">
                {/* <button className="flex flex-1 items-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
                  {" "}
                  <PencilIcon />
                  <span>edit</span>{" "}
                </button> */}
                {/* divider */}
                {/* <div className="h-px w-full bg-gray-300"></div> */}
                <button className="flex flex-1 items-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
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
