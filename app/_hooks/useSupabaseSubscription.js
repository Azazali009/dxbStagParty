"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../_utils/supabase/client"; // apka supabase client

export function useSupabaseSubscription({ table, filterKey }) {
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase
      .channel(`${table}:${filterKey || "default"}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
        },
        () => {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, table, filterKey]);
}
