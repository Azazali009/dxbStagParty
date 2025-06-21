"use client";
import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateBookingPaymentStatus } from "../_lib/actions";
import toast from "react-hot-toast";
import SpinnerMini from "../_components/SpinnerMini";
import { getPendingBookings } from "../_lib/data-services";
import { useBooking } from "../_context/bookingProvider";

export default function BookingsActions({ booking }) {
  const { id, totalPrice, paymentStatus } = booking;
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { setPendingBookingCount } = useBooking();

  const handleToggle = () => {
    setOpen(!open);
  };

  //   create update data object
  const updateBookingData = {
    paidAmount: totalPrice,
  };
  //   send addtional data to action
  const updateBookingPaymentStatusWithUpdateData =
    updateBookingPaymentStatus.bind(null, updateBookingData);
  // handle function
  const handleChangePaymentStatus = (formData) => {
    startTransition(async () => {
      const res = await updateBookingPaymentStatusWithUpdateData(formData);
      setOpen(false);
      const updateBookings = await getPendingBookings();
      setPendingBookingCount(updateBookings.length);
      if (res?.error) toast.error(res?.error);
    });
  };

  return (
    <div className="relative flex items-center justify-end">
      <button
        disabled={
          paymentStatus === "completed" || paymentStatus === "cancelled"
        }
        onClick={handleToggle}
        className="rounded-md border border-gray-800 bg-gray-900 px-4 py-2 capitalize shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
      >
        actions
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            initial={{ scale: 0, opacity: 0, x: 100, y: -50 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{ scale: 0, opacity: 0, x: 100, y: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 top-10 z-10 flex flex-col gap-3 rounded-md border border-gray-800 bg-gray-900 p-4 shadow-md"
            action={async (formData) => handleChangePaymentStatus(formData)}
          >
            <h3 className="text-[7px] font-medium xs:text-[9px] sm:text-sm">
              Make booking as{" "}
              <strong className="text-[9px] text-emerald-600 xs:text-sm sm:text-lg">
                completed
              </strong>{" "}
              or{" "}
              <strong className="text-[9px] text-red-600 xs:text-sm sm:text-lg">
                cancelled
              </strong>
              .
            </h3>
            <select
              name="paymentStatus"
              required
              className="w-full rounded-md border-none bg-navyBlue px-1 py-1.5 text-[8px] outline-none focus:outline-matalicGold disabled:bg-navyBlue xs:text-xs sm:px-4 sm:text-base"
            >
              <option selected value="">
                Change payment status
              </option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input type="hidden" value={id} name="bookingId" />
            <button
              disabled={isPending}
              type="submit"
              className="rounded-md bg-navyBlue py-2 text-[9px] capitalize hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:opacity-50 xs:text-xs sm:text-base"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <SpinnerMini /> updating...
                </span>
              ) : (
                "update booking"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
