import { createClient } from "../_utils/supabase/client";

const supabase = createClient();

export async function getCategories() {
  let { data, error } = await supabase.from("category").select("*");
  if (error) return { error: "Unable to load categories" };

  return data;
}

export async function getCategoryByName(name) {
  let { data, error } = await supabase
    .from("category")
    .select("*")
    .ilike("name", name)
    .single();
  if (error) return { error: "Unable to load categories" };

  return data;
}
