import { supabaseAdmin } from "../_lib/adminSupabase";

export async function getUsers() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    throw new Error(error.message);
  }

  return data.users;
}

export async function deleteUser(userId) {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.error("Error deleting user:", error);
    throw new Error(error.message);
  }

  return true;
}
