import { createClient } from "../_utils/supabase/client";

const supabase = createClient();

export async function createOrganizer(newOrganizer) {
  const { data, error } = await supabase
    .from("organizer")
    .insert([newOrganizer])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Organizer could not created.");
  }

  return data;
}

export async function getOrganizer(email) {
  let { data, error } = await supabase
    .from("organizer")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! I handle the possibility of no Organizer in the sign in callback
  return data;
}
