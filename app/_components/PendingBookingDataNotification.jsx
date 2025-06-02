"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Notification() {
  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));

    // Check if the booking was recently completed (don't show notification if so)
    const bookingInProgress =
      localStorage.getItem("bookingInProgress") === "true";

    if (bookingData && !bookingInProgress) {
      toast.error(
        (t) => (
          <div>
            <p>You have an incomplete order pending. Please clear it.</p>
            <div className="flex items-center gap-4">
              <button
                className="mt-2 rounded border border-red-500 bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => {
                  localStorage.removeItem("bookingData");
                  toast.dismiss(t.id);
                }}
              >
                Clear Data
              </button>
              <button
                className="mt-2 rounded border border-neutral-400 px-4 py-2 text-neutral-500 duration-300 hover:bg-neutral-100"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ),
        { duration: 5000 },
      );
    }

    // Clear the "just completed" flag after the first check
    if (bookingInProgress) {
      localStorage.removeItem("bookingInProgress");
    }
  }, []);

  return null;
}
