"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../_utils/supabase/client"; // <- apna client factory

export default function RealtimeRefresher({ bookingId }) {
  const router = useRouter();
  const refreshing = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    // ek channel per booking page
    const channel = supabase.channel(`booking:${bookingId}`);

    // debounce: rapid events me multiple refresh avoid
    const safeRefresh = () => {
      if (refreshing.current) return;
      refreshing.current = true;
      router.refresh();
      // thoda cooldown
      setTimeout(() => (refreshing.current = false), 300);
    };

    // BOOKING row changes (sirf current booking)
    channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "booking",
        filter: `id=eq.${bookingId}`,
      },
      () => safeRefresh(),
    );

    // ATTENDEE changes tied to this booking
    channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "attendee",
        filter: `bookingID=eq.${bookingId}`,
      },
      () => safeRefresh(),
    );

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookingId, router]);

  return null; // bridge component UI render nahi karta
}
