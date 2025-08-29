"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { deleteBooking } from "../_lib/data-services";

export default function BookingFailed() {
  const router = useRouter();

  useEffect(() => {
    const cancelBooking = async () => {
      const bookingData = JSON.parse(localStorage.getItem("bookingData"));
      const bookingId = bookingData?.bookingId;

      if (bookingId) {
        // Delete booking from DB
        await deleteBooking(bookingId);
        // Clean up localStorage
        localStorage.removeItem("bookingData");
        localStorage.removeItem("bookingInProgress");
      }
    };

    cancelBooking();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-softGold">
      <div className="flex max-w-md flex-col items-center gap-6 rounded-2xl p-8 shadow-xl">
        <Image src="/error.png" alt="Booking Failed" width={200} height={200} />
        <h2 className="mb-2 text-2xl font-bold text-red-600">Booking Failed</h2>
        <p className="">
          Your payment was not completed. Please try again or contact support if
          the issue persists.
        </p>
        <Link
          href={"/builder"}
          className="hover:bg-primary-dark rounded-lg bg-red-600 px-6 py-2 font-semibold text-white transition-all duration-300 hover:opacity-70 active:scale-90"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
