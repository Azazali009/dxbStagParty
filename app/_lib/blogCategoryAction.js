"use server";

import { redirect } from "next/navigation";
import { createClient } from "../_utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCatgeoryAction(formData) {
  const supabase = await createClient();

  const name = formData.get("name").slice(0, 100);
  const slug = formData.get("slug").slice(0, 100);

  if (!name || !slug) return { error: "Please fill all fields" };

  const { error } = await supabase
    .from("blogCategories")
    .insert([{ name, slug }])
    .select();

  if (error) {
    if (
      error.message ===
      'duplicate key value violates unique constraint "blogCategories_slug_key"'
    )
      return {
        error: "Oops! This slug is already in use. Try another unique slug.",
      };
    return { error: error.message };
  }

  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings");
}

export async function updateCatgeoryAction(formData) {
  const supabase = await createClient();

  const name = formData.get("name").slice(0, 100);
  const slug = formData.get("slug").slice(0, 100);
  const categoryId = Number(formData.get("categoryId"));

  if (!name || !slug) return { error: "Please fill all fields" };

  const { error } = await supabase
    .from("blogCategories")
    .update({ name, slug })
    .eq("id", categoryId);

  if (error) {
    if (
      error.message ===
      'duplicate key value violates unique constraint "blogCategories_slug_key"'
    )
      return {
        error: "Oops! This slug is already in use. Try another unique slug.",
      };
    return { error: error.message };
  }
  revalidatePath(`dashboard/settings/update-category/${categoryId}`);
  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings");
}
export async function deleteBlogCategoryAction(categoryId) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("blogCategories")
    .delete()
    .eq("id", categoryId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/settings");
}
