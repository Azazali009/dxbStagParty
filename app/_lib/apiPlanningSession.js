import { createClient } from "../_utils/supabase/client";

export async function getCurrentUserPlanningData(userId) {
  const supabase = createClient();
  let { data, error } = await supabase
    .from("planning_sessions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.log(error);
    return { error: "Error" };
  }
  return data;
}

export async function getPlanningSessionByUserId(userId) {
  const supabase = createClient();
  let { data: planning_sessions, error } = await supabase
    .from("planning_sessions")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) {
    console.error("Error fetching planning session:", error);
    return { error: error.message };
  }
  return planning_sessions;
}
