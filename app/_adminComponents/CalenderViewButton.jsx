"use client";

import { useBooking } from "../_context/bookingProvider";

export default function CalenderViewButton() {
  const { showCalenderView, setShowCalenderView } = useBooking();

  return (
    <button
      onClick={() => setShowCalenderView((show) => !show)}
      className="flex h-10 items-center gap-3 rounded-md bg-emerald-700 px-6 text-base capitalize tracking-wide shadow-lg duration-300 hover:bg-emerald-800 hover:shadow-none"
    >
      show Calender View
    </button>
  );
}
