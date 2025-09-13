import { supabaseAdmin } from "../_lib/adminSupabase";
import { createClient } from "../_utils/supabase/server";

export async function getUsers() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    return { error: error.message };
  }

  return data.users;
}

export async function deleteUser(userId) {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.error("Error deleting user:", error);
    return { error: error.message };
  }

  return true;
}

export async function getNonVerifiedUsers() {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("isVerified", false);

  if (error) return { error: "Unable to load non verified users" };
  return data;
}
export async function getVerifiedUsers() {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("isVerified", true);

  if (error) return { error: "Unable to load users" };
  return data;
}
export async function updateUser(updateData) {
  const supabase = await createClient();

  // 1) Update user in auth table
  // Build payload dynamically
  const payload = {
    data: { full_name: updateData.full_name, avatar_url: updateData.avatar },
  };
  if (updateData.password && updateData.password.trim() !== "") {
    payload.password = updateData.password; // ✅ sirf tabhi bhejo jab password diya ho
  }

  const { error: authUpdateError } = await supabase.auth.updateUser(payload);

  if (authUpdateError) {
    return { error: authUpdateError?.message };
  }

  // 2) update user in user cutom table

  const { error: customUserError } = await supabase
    .from("users")
    .update({
      fullName: updateData.full_name,
      avatar: updateData.avatar,
    })
    .eq("id", updateData.userId);
  if (customUserError) {
    return { error: customUserError?.message };
  }
}
