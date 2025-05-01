import { createClient } from "../_utils/supabase/server"; // adjust the path as needed

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // if (error) {
  //   console.error("Error fetching user:", error.message);
  //   throw new Error("Error while fetching current user");
  // }

  return user;
}
