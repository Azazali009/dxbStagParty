import BookingTableHeader from "./BookingTableHeader";

export default function BookingTable({ booking, attendee }) {
  return (
    <div className="!my-20">
      <h1 className="mb-4 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold capitalize text-transparent">
        Payment:{" "}
        <span
          className={`${booking.paymentStatus === "pending" ? "text-red-600" : "text-green-500"}`}
        >
          {booking.paymentStatus}
        </span>
      </h1>
      <div className="hidden max-w-full text-[14px] md:block">
        <BookingTableHeader />
        <div className="grid grid-cols-7 justify-items-center rounded-b-md border border-[#424242] bg-transparent px-2 py-2">
          <p className="line-clamp-1"> {booking?.activityName}</p>
          <p> {booking.totalPrice}</p>
          <p> {booking?.paidAmount ?? "0"}</p>
          <p> {attendee.length}</p>
          <p>Dubai</p>
          <p className="col-span-2 text-balance"> {booking.organizerEmail}</p>
        </div>
      </div>
    </div>
  );
}
