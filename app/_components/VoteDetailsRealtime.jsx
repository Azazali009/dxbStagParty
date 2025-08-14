// components/VoteDetailsRealtime.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../_lib/supabase"; // your browser client

export default function VoteDetailsRealtime({ sessionId }) {
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel(`voting_session_${sessionId}`)
      // Session row changes (title/status/end_time/result_json, etc.)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "voting_sessions",
        },
        () => router.refresh(),
      )
      // (Optional) If votes are stored in a separate table and totals derive from there
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "votes",
        },
        () => router.refresh(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, router]);

  return null; // or show a small "Live" badge if you want
}
