import { supabaseAdmin } from "../_lib/adminSupabase";
export async function getUsers() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    throw new Error(error.message);
  }

  return data.users;
}
