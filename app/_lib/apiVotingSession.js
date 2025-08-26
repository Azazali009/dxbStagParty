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
export async function getVotingSessions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("voting_sessions")
    .select("id, title, status, created_at, end_time")
    .order("created_at", { ascending: false });

  if (error) {
    return {
      error: " There is some internal error while fetching voting sessions.",
    };
  }

  return data;
}

// Fetch a session with vote counts per activity
export async function getVotingSessionDetail(sessionId) {
  const supabase = await createClient();
  // 1) Session info
  const { data: session, error: sessionError } = await supabase
    .from("voting_sessions")
    .select("id, title, status, created_at, end_time, activity_ids")
    .eq("id", sessionId)
    .single();

  if (sessionError) return { error: sessionError.message };

  // 2) Fetch all votes for this session
  const { data: votes, error: votesError } = await supabase
    .from("votes")
    .select("activity_id")
    .eq("session_id", sessionId);

  if (votesError) return { error: votesError.message };

  // Aggregate votes per activity (client-side)
  const voteMap = {};
  votes.forEach((v) => {
    voteMap[v.activity_id] = (voteMap[v.activity_id] || 0) + 1;
  });

  // 3) Fetch activities
  const activityIds = session.activity_ids || [];
  const { data: activities, error: activitiesError } = await supabase
    .from("activities")
    .select("id, name, description, bannerImage")
    .in("id", activityIds);

  if (activitiesError) return { error: activitiesError.message };

  return { session, activities, voteMap };
}

export async function getVotesLog() {
  const supabase = await createClient();

  const { data: votes, error: votesError } = await supabase
    .from("votes")
    .select("id, session_id, activity_id, voter_id, created_at")
    .order("created_at", { ascending: false });

  if (votesError) throw new Error(votesError.message);

  // 2) Get all related sessions (for voter_contacts + activity_ids)
  const sessionIds = [...new Set(votes.map((v) => v.session_id))];
  const { data: sessions, error: sessionsError } = await supabase
    .from("voting_sessions")
    .select("id, voter_contacts, activity_ids")
    .in("id", sessionIds);

  if (sessionsError) throw new Error(sessionsError.message);

  // 3) Get all related activities
  const activityIds = [...new Set(votes.map((v) => v.activity_id))];
  const { data: activities, error: activitiesError } = await supabase
    .from("activities")
    .select("id, name, image")
    .in("id", activityIds);

  if (activitiesError) throw new Error(activitiesError.message);

  // 4) Map votes with activity + voter name
  const sessionsMap = Object.fromEntries(sessions.map((s) => [s.id, s]));
  const activitiesMap = Object.fromEntries(activities.map((a) => [a.id, a]));

  const formattedVotes = votes.map((v) => {
    // Activity info
    const activity = activitiesMap[v.activity_id] || null;

    // Voter info (match voter_id with voter_contacts.email)
    let voterName = v.voter_id;
    const session = sessionsMap[v.session_id];
    if (session && Array.isArray(session.voter_contacts)) {
      const found = session.voter_contacts.find((c) => c.email === v.voter_id);
      if (found) voterName = found.name;
    }

    return {
      id: v.id,
      session_id: v.session_id,
      activity,
      voter: voterName,
      created_at: v.created_at,
    };
  });

  return formattedVotes;
}

export async function getVotingReports() {
  const supabase = await createClient();
  // 1) Raw votes log (reuse existing function)
  const votes = await getVotesLog();

  // 2) Aggregate: votes per activity
  const activityVoteCount = {};
  votes.forEach((v) => {
    const activityId = v.activity?.id;
    if (activityId) {
      activityVoteCount[activityId] = (activityVoteCount[activityId] || 0) + 1;
    }
  });

  // 3) Make results array
  const results = Object.entries(activityVoteCount).map(([id, count]) => {
    const vote = votes.find((v) => v.activity?.id === parseInt(id, 10));
    return {
      id: parseInt(id, 10),
      name: vote?.activity?.name || "Unknown",
      image: vote?.activity?.image || null,
      votes: count,
    };
  });

  // Sort descending
  results.sort((a, b) => b.votes - a.votes);

  // 4) Trend over time (by date)
  const trendMap = {};
  votes.forEach((v) => {
    const dateKey = new Date(v.created_at).toISOString().split("T")[0]; // YYYY-MM-DD
    trendMap[dateKey] = (trendMap[dateKey] || 0) + 1;
  });

  const trend = Object.entries(trendMap).map(([date, count]) => ({
    date,
    votes: count,
  }));

  return { results, trend };
}
