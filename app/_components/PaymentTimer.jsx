"use client";
import { useEffect, useState } from "react";

export default function PaymentTimer({ expiresAt, bookingPaymentStatus }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [hydrated, setHydrated] = useState(false); // ✅ Prevent SSR mismatch

  useEffect(() => {
    setHydrated(true); // ✅ Mark component as mounted

    const calculateTimeLeft = () => {
      const expiryTime = new Date(expiresAt).getTime();
      const now = new Date().getTime();
      const difference = expiryTime - now;

      if (difference <= 0) {
        return null; // Payment link expired
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  if (!hydrated) {
    return <p className="text-gray-500">Loading...</p>; // ✅ Prevent SSR mismatch
  }

  if (!timeLeft) {
    return (
      <p className="animate-pulse text-sm font-semibold text-red-500">
        ❌ Payment Link Expired
      </p>
    );
  }

  return (
    <p className={`text-xs font-medium text-secondary xs:text-sm md:text-lg`}>
      Payment link expires in:{" "}
      {bookingPaymentStatus !== "cancelled" ? (
        <span className="font-semibold">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </span>
      ) : (
        <span className="font-medium">Expired</span>
      )}
    </p>
  );
}
