import Link from "next/link";
import { getBookings } from "../_lib/data-services";
import { EyeIcon } from "@heroicons/react/24/solid";

export default async function Page() {
  const bookings = await getBookings();

  return (
    <div className="mx-auto max-w-5xl text-sm">
      <h1 className="mb-6 text-2xl font-semibold capitalize">
        all booking {bookings.length}
      </h1>

      <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center rounded-t-md border border-[#424242] bg-[#383838] px-4 py-3 font-semibold">
        <p>Booking ID</p>
        <p>Booking Price</p>
        <p>Owner</p>
        <p>Payment</p>
        <p className="justify-self-center">Action</p>
      </div>

      <div className="no-scrollbar h-[350px] overflow-y-scroll">
        {bookings.map((booking) => {
          return (
            <div
              className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center justify-center border border-[#424242] bg-transparent px-4 py-3 font-light last:rounded-b-md"
              key={booking.id}
            >
              <p>{booking.id}</p>
              <p>$ {booking.totalPrice} </p>
              <p> {booking.organizerEmail} </p>
              {booking.paymentStatus === "pending" && (
                <p
                  className={
                    "max-w-28 rounded-full bg-tertiary py-1 text-center text-xs font-medium capitalize"
                  }
                >
                  {booking.paymentStatus}
                </p>
              )}
              {booking.paymentStatus === "completed" && (
                <p
                  className={
                    "max-w-28 rounded-full bg-green-100 px-4 py-1 text-center text-xs font-medium capitalize text-green-900"
                  }
                >
                  {booking.paymentStatus}
                </p>
              )}
              <Link href={`/bookings/${booking.id}`} title="View Booking">
                <EyeIcon
                  width={18}
                  className="justify-self-center text-blue-500 hover:text-white"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
