import { createClient } from "../_utils/supabase/client";

export async function getSuppliers() {
  const supabase = createClient();
  let { data: suppliers, error } = await supabase.from("supplier").select("*");
  if (error) throw new Error("Unable to get suppliers.");

  return suppliers;
}
