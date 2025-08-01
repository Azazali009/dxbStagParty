import BookingTableHeader from "./BookingTableHeader";

export default function BookingTable({ booking, attendee }) {
  return (
    <div>
      <h1 className="mb-4 text-xl font-bold capitalize text-secondary xs:text-2xl sm:text-3xl">
        Payment:{" "}
        <span
          className={`${
            booking.paymentStatus === "pending"
              ? "text-red-600"
              : booking.paymentStatus === "completed"
                ? "text-green-500"
                : booking.paymentStatus === "cancelled"
                  ? "text-gray-500"
                  : "text-softGold"
          }`}
        >
          {booking.paymentStatus}
        </span>
      </h1>
      <div className="hidden bg-navyBlue text-[14px] sm:block">
        <BookingTableHeader />
        <div className="grid grid-cols-9 items-center justify-items-center rounded-b-md border border-gray-700 bg-transparent px-2 py-2 text-center text-[8px] lg:text-xs">
          <p className="col-span-2 flex flex-col gap-1">
            {" "}
            {booking?.activities?.map((act, i) => {
              return <span key={i}>{act.name}</span>;
            })}
          </p>
          <p className="flex flex-col gap-1 text-center">
            {" "}
            {booking?.packages?.map((pack, i) => {
              return <span key={i}>{pack.name}</span>;
            })}
          </p>
          <p>{booking.totalPrice}</p>
          <p> {booking?.paidAmount ?? "0"}</p>
          <p> {attendee.length}</p>
          <p>{booking.users.fullName}</p>
          <p className="col-span-2 text-balance"> {booking.users.email}</p>
        </div>
      </div>
    </div>
  );
}
