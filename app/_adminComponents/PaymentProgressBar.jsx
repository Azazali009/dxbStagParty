export default function PaymentProgressBar({ attendee, bookingPaymentStatus }) {
  const paidAttendees = attendee.filter((cur) => cur.status === "paid")?.length;

  const paidPaymentPercentage = Number(
    Math.round((paidAttendees * 100) / attendee.length) || 0,
  );
  return (
    <div
      className={`space-y-4 ${bookingPaymentStatus === "cancelled" && "grayscale"}`}
    >
      <div className="relative h-6 w-full rounded-full bg-neutral-600 shadow-xl">
        <div
          className={`absolute left-0 top-0 h-full rounded-full px-6 text-right font-semibold text-primary`}
          style={{
            width: `${paidPaymentPercentage}%`,
            backgroundColor:
              paidPaymentPercentage < 50
                ? "#DC2626"
                : paidPaymentPercentage < 80
                  ? "#FCD34D"
                  : "#22c55e",
          }}
        >
          <span className="relative z-10 flex h-full items-center justify-end px-2">
            {" "}
            {paidPaymentPercentage}%
          </span>
        </div>
      </div>
      {bookingPaymentStatus !== "cancelled" && (
        <div className="font-medium">
          Total Paid: {paidAttendees} of {attendee.length} (
          {paidPaymentPercentage}%)
        </div>
      )}
      {bookingPaymentStatus === "cancelled" && (
        <div className="font-medium opacity-55">Total Paid: Cancelled</div>
      )}
    </div>
  );
}
