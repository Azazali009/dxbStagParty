"use client";
import React, { useEffect, useState } from "react";
import { getPendingBookings } from "../_lib/data-services";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function PendingBookingAlert() {
  const [pendingCount, setPendingCount] = useState(0);
  const [oldPending, setOldPending] = useState(false);

  async function fetchPendingBookings() {
    const bookings = await getPendingBookings();
    setPendingCount(bookings.length);

    const now = new Date();
    const oldOnes = bookings.filter((b) => {
      const createdAt = new Date(b.created_at);
      const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
      return hoursDiff > 24;
    });
    setOldPending(oldOnes.length > 0);
  }

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("pendingAlertSeen");
    if (alreadySeen === "true") return;

    fetchPendingBookings();

    const interval = setInterval(
      () => {
        fetchPendingBookings();
      },
      5 * 60 * 1000,
    ); // refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  function handleDismiss() {
    sessionStorage.setItem("pendingAlertSeen", "true");
    setPendingCount(0);
  }

  return (
    <AnimatePresence>
      {pendingCount > 0 && (
        <motion.div
          key="pending-alert"
          initial={{ x: "100%", opacity: 0, scale: 0 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: "100%", opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative space-y-2 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 px-4 py-8 shadow-xl"
        >
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 text-2xl text-red-600"
          >
            &times;
          </button>

          <h2 className="text-xl font-bold text-yellow-800">
            🚨 You have {pendingCount} pending booking
            {pendingCount > 1 ? "s" : ""}!
          </h2>
          <div className="leading-[1.6] text-yellow-700">
            Please review the pending bookings in your dashboard.{" "}
            <Link
              className="inline-block capitalize text-indigo-600 underline hover:no-underline"
              href={"/dashboard/bookings"}
            >
              Review pending bookings
            </Link>
            {oldPending && (
              <div>
                <span className="font-semibold">
                  Some have been pending for over 24 hours!
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
