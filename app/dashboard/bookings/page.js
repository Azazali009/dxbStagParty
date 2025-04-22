import { getBookings } from "../../_lib/data-services";

import BookingFilter from "../../_components/BookingFilter";
import DisplayBookingTable from "../../_components/DisplayBookingTable";

export const revalidate = 0;
export default async function Page({ searchParams }) {
  const bookings = await getBookings();

  let filteredBookings;
  if (searchParams.paymentStatus === "all" || !searchParams.paymentStatus)
    filteredBookings = bookings;
  if (searchParams.paymentStatus === "completed")
    filteredBookings = bookings.filter(
      (booking) => booking.paymentStatus === "completed",
    );
  if (searchParams.paymentStatus === "pending")
    filteredBookings = bookings.filter(
      (booking) => booking.paymentStatus === "pending",
    );
  if (searchParams.paymentStatus === "cancelled")
    filteredBookings = bookings.filter(
      (booking) => booking.paymentStatus === "cancelled",
    );
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4 text-sm">
      <h1 className="mb-6 text-2xl font-semibold capitalize">
        all booking {bookings.length}
      </h1>
      <BookingFilter />
      <DisplayBookingTable bookings={filteredBookings} />
    </div>
  );
}
