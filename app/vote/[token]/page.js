"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../_utils/supabase/client";
import Image from "next/image";
import Empty from "../../_components/Empty";
import toast from "react-hot-toast";

export default function VotingPage({ params }) {
  const supabase = createClient();
  const { token } = params;

  const [sessionData, setSessionData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingVote, setLoadingVote] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchVotingSession = async () => {
      const localVote = localStorage.getItem(`voted-${token}`);
      if (localVote) {
        setHasVoted(true);
      }
      // Get session data by link_token
      const { data: sessions, error } = await supabase
        .from("voting_sessions")
        .select("*")
        .eq("link_token", token)
        .single();

      if (error || !sessions) {
        setLoading(false);
        return;
      }

      // If voting closed
      if (sessions.status !== "open") {
        setSessionData({ closed: true });
        setLoading(false);
        return;
      }

      setSessionData(sessions);

      // Get activities
      const { data: acts } = await supabase
        .from("activities")
        .select("*")
        .in("id", sessions.activity_ids);

      setActivities(acts || []);
      setLoading(false);
    };

    fetchVotingSession();
  }, [token]);

  const handleVote = async (activityId) => {
    setLoadingVote(true);
    if (!sessionData) return;

    // Prevent multiple votes per person (track via localStorage)
    if (localStorage.getItem(`voted-${token}`)) {
      toast.error("You have already voted.");
      setLoadingVote(false);
      return;
    }

    const voterId = crypto.randomUUID(); // or attendee email if logged in

    const { error } = await supabase.from("votes").insert([
      {
        session_id: sessionData.id,
        activity_id: activityId,
        voter_id: voterId,
        timestamp: new Date(),
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Failed to cast vote.");
      setLoadingVote(false);
      return;
    }

    localStorage.setItem(`voted-${token}`, "true");
    setHasVoted(true);
    setLoadingVote(false);

    // ✅ Call Edge Function for early close
    try {
      const res = await fetch(
        "https://dvuzbcalsepjpbwkypyz.supabase.co/functions/v1/close_if_all_voted",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ session_id: sessionData.id }),
        },
      );
    } catch (err) {
      console.warn("Early close check failed", err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-center">Loading voting session...</p>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Empty name="Voting Session" />
      </div>
    );
  }

  if (sessionData.closed) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-center font-semibold text-red-500">
          Voting has ended.
        </p>
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-xl font-bold text-matalicGold sm:text-6xl">
          Thanks for voting!
        </h2>
        <p className="text-neutral-400">
          Results will be shared by the organiser.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-dvh max-w-3xl p-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-matalicGold">
        Vote for Your Favorite Activity
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {activities.map((act) => (
          <div key={act.id} className="rounded-lg border p-4 shadow">
            <Image
              src={act.bannerImage}
              alt={act.name}
              width={500}
              height={500}
              className="h-40 w-full rounded object-cover"
            />
            <h3 className="mt-2 text-lg font-semibold">{act.name}</h3>
            <p className="text-sm text-gray-500">
              {act.duration} • ${act.price} PP
            </p>
            <button
              disabled={loadingVote}
              onClick={() => handleVote(act.id)}
              className="mt-3 w-full rounded bg-matalicGold py-2 font-semibold text-black hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80"
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
