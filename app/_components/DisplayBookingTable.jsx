import Link from "next/link";
import EyeIcon from "../svgIcons/EyeIcon";

export default function DisplayBookingTable({ bookings }) {
  return (
    <div>
      <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center rounded-t-md border border-gray-300 bg-white px-4 py-3 font-semibold">
        <p>Booking ID</p>
        <p>Booking Price</p>
        <p>Owner</p>
        <p>Payment</p>
        <p className="justify-self-center">Action</p>
      </div>

      <div className="no-scrollbar h-[350px] overflow-y-auto">
        {!bookings?.length ? (
          <p className="py-4 text-center">No bookings found</p>
        ) : (
          bookings.map((booking) => {
            return (
              <div
                className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center justify-center border border-gray-300 bg-white px-4 py-3 font-light last:rounded-b-md"
                key={booking.id}
              >
                <p>{booking.id}</p>
                <p>$ {booking.totalPrice} </p>
                <p> {booking.organizerEmail} </p>
                {booking.paymentStatus === "pending" && (
                  <p
                    className={
                      "max-w-28 rounded-full bg-tertiary py-1 text-center text-xs font-semibold capitalize tracking-wide text-white"
                    }
                  >
                    {booking.paymentStatus}
                  </p>
                )}
                {booking.paymentStatus === "confirmed" && (
                  <p
                    className={
                      "max-w-28 rounded-full bg-green-300 px-4 py-1 text-center text-xs font-semibold capitalize tracking-wide text-green-900"
                    }
                  >
                    {booking.paymentStatus}
                  </p>
                )}

                <Link
                  className="justify-self-center"
                  href={`/bookings/${booking.id}`}
                  title="View Booking"
                >
                  <EyeIcon />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
