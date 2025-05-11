"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { updateAttendeeResendIncrementAction } from "../_lib/attendeeAction";
import SpinnerMini from "./SpinnerMini";

export default function ResendPayment({
  attendee,
  bookingID,
  bookingPaymentStatus = { bookingPaymentStatus },
}) {
  const [isPending, startTransition] = useTransition();

  async function handleClick() {
    startTransition(async () => {
      const res = await updateAttendeeResendIncrementAction(
        attendee,
        bookingID,
      );
      if (res?.error) return toast.error(res?.error);
      toast.success(`Link send successfully to ${attendee.email}`);
    });
  }
  return (
    <>
      {attendee.resendIncrement > 0 &&
      attendee.status === "unpaid" &&
      bookingPaymentStatus === "pending" ? (
        <button
          onClick={handleClick}
          disabled={isPending}
          className="rounded-full border-2 border-emerald-700 px-4 py-3 text-sm font-medium capitalize duration-300 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <SpinnerMini /> <span>sending...</span>{" "}
            </div>
          ) : (
            `resend payment link (${attendee.resendIncrement})`
          )}
        </button>
      ) : (
        <button
          disabled
          className="text-nowrap rounded-full border-2 border-emerald-700 px-5 py-3 text-sm font-medium text-white shadow-md duration-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          🚫 Limit Reached
        </button>
      )}
    </>
  );
}
