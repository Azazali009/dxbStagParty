import BookingRow from "../_components/BookingRow";

export default function DisplayBookingTable({ bookings }) {
  return (
    <div>
      <div className="grid grid-cols-[1fr_1fr_1fr_2fr_1fr_1fr] items-center rounded-t-md border border-b-0 border-gray-800 bg-navyBlue px-4 py-3 font-semibold">
        <p>Booking ID</p>
        <p>Booking Price</p>
        <p>Date</p>
        <p>Owner</p>
        <p>Payment</p>
        <p className="justify-self-center">Action</p>
      </div>

      <div className="no-scrollbar h-[350px] overflow-y-auto">
        {!bookings?.length ? (
          <p className="py-4 text-center">No bookings found</p>
        ) : (
          bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))
        )}
      </div>
    </div>
  );
}
