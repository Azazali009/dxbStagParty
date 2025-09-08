"use client";
import React, { useEffect } from "react";
import BookingListItem from "./BookingListItem";
import { useRouter } from "next/navigation";
import { supabase } from "../_lib/supabase";

export default function BookingList({ bookings }) {
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel(`bookings`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "booking",
        },
        function (payload) {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingListItem key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
