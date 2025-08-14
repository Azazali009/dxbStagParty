import { createClient } from "../_utils/supabase/server";

export async function getVotingSessionsByOrganiserId(organiserId) {
  const supabase = await createClient();
  // 1) Get sessions
  let { data: sessions, error: sErr } = await supabase
    .from("voting_sessions")
    .select("*")
    .eq("organiser_id", organiserId)
    .order("created_at", { ascending: false });

  if (sErr) {
    return {
      error: "There is some internal error while fetching voting sessions.",
    };
  }

  // 2) Collect all unique activity IDs from all sessions' result_json
  const allActivityIds = [];
  sessions.forEach((s) => {
    const counts = s?.result_json?.counts || {};
    Object.keys(counts).forEach((id) => {
      const numId = Number(id);
      if (!allActivityIds.includes(numId)) {
        allActivityIds.push(numId);
      }
    });
  });

  // 3) Fetch those activities
  let { data: activities, error: aErr } = await supabase
    .from("activities")
    .select("id, name")
    .in("id", allActivityIds);

  if (aErr) {
    return {
      error: "Error fetching activities.",
    };
  }

  const activityMap = Object.fromEntries(activities.map((a) => [a.id, a.name]));

  // 4) Map sessions with activity_results
  const sessionsWithResults = sessions.map((session) => {
    const counts = session?.result_json?.counts || {};
    const winners = Array.isArray(session.result_activity_ids)
      ? session.result_activity_ids.map((id) => Number(id))
      : [];

    const activity_results = Object.entries(counts).map(([id, votes]) => ({
      id: Number(id),
      name: activityMap[Number(id)] || `Activity #${id}`,
      votes,
      isWinner: winners.includes(Number(id)),
    }));

    return {
      ...session,
      activity_results: activity_results.sort((a, b) => b.votes - a.votes),
    };
  });

  return sessionsWithResults;
}

export async function getVotingSessionById(id) {
  const supabase = await createClient();
  let { data, error } = await supabase
    .from("voting_sessions")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return {
      error:
        " There is some internal error while fetching voting session data.",
    };
  }

  return data;
}

export async function getVotesBySessionId(sessionId) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("votes")
    .select("*")
    .eq("session_id", sessionId);

  return data;
}
export async function getVotesByActivityId(activityId) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("votes")
    .select("*", { count: "exact", head: true })
    .eq("activity_id", activityId);

  return count;
}
