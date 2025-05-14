import { createClient } from "../_utils/supabase/client";

const supabase = createClient();

export async function getBlogs() {
  const { data, error } = await supabase.from("blog").select("*");
  if (error) return { error: "Server error occurred while fetching blogs" };
  return data;
}
export async function getBlogById(id) {
  const { data, error } = await supabase
    .from("blog")
    .select(`*,users(fullName,avatar)`)
    .eq("id", id)
    .single();
  if (error) return { error: "Server error occurred while fetching blog data" };

  return data;
}
