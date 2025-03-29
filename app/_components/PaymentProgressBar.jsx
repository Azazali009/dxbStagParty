export default function PaymentProgressBar({ attendee }) {
  const paidAttendees = attendee.filter((cur) => cur.status === "paid")?.length;

  const paidPaymentPercentage = Number(
    Math.round((paidAttendees * 100) / attendee.length),
  );
  return (
    <div className="grid grid-cols-[10rem_1fr]">
      <div className="font-semibold">
        Total Paid: {paidAttendees}/{attendee.length}
      </div>
      <div className="relative h-6 w-full rounded-full bg-tertiary shadow-shadowOne">
        <div
          className={`absolute left-0 top-0 h-full rounded-full px-2 text-right font-semibold text-white`}
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
          <span className="relative z-10"> {paidPaymentPercentage}%</span>
        </div>
      </div>
    </div>
  );
}
