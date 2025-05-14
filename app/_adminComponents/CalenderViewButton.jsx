"use client";

import { useBooking } from "../_context/bookingProvider";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";

export default function CalenderViewButton() {
  const { showCalenderView, setShowCalenderView } = useBooking();

  return (
    <button
      onClick={() => setShowCalenderView((show) => !show)}
      className="flex h-10 items-center gap-1 rounded-lg bg-white px-6 text-sm !font-medium capitalize text-indigo-800 shadow-lg duration-300 hover:bg-gray-200 hover:shadow-none"
    >
      <CalenderDaysIcon />
      <span>show Calender View</span>
    </button>
  );
}
