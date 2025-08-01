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
          className="text-nowrap rounded-full border-2 border-emerald-700 px-4 py-2.5 text-xs font-medium capitalize duration-300 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent md:text-base"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <SpinnerMini /> <span>sending...</span>{" "}
            </div>
          ) : (
            `resend link (${attendee.resendIncrement})`
          )}
        </button>
      ) : (
        <button
          disabled
          className="text-nowrap rounded-full border-2 border-emerald-700 px-4 py-2.5 text-xs font-medium text-white shadow-md duration-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          🚫 Limit Reached
        </button>
      )}
    </>
  );
}
