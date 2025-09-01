import { createClient } from "../_utils/supabase/client";

const supabase = createClient();

export async function getBlogs() {
  const { data, error } = await supabase
    .from("blog")
    .select(`*,blogCategories(name,slug),users(fullName,avatar)`);
  if (error) return { error: "Server error occurred while fetching blogs" };
  return data;
}
export async function getBlogById(id) {
  const { data, error } = await supabase
    .from("blog")
    .select(`*,users(fullName,avatar),blogCategories(id,name,slug)`)
    .eq("id", id)
    .single();
  if (error) {
    return { error: "Server error occurred while fetching blog data" };
  }

  return data;
}

export async function getBlogCategories() {
  let { data: blogCategories } = await supabase
    .from("blogCategories")
    .select("*");

  return blogCategories;
}
export async function getBlogsByCategoryId(categoryId) {
  const { data, error } = await supabase
    .from("blog")
    .select(`*,blogCategories(name,slug)`)
    .eq("category", categoryId);
  if (error) return { error: "Server error occurred while fetching blogs" };
  return data;
}

export default async function RecentBlogs() {
  const { data, error } = await supabase
    .from("blog")
    .select("id, name,description, image, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    return { error: "Server error occurred while fetching recent blogs" };
  }
  return data;
}
