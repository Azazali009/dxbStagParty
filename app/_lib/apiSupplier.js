import { createClient } from "../_utils/supabase/client";

const supabase = createClient();
export async function getSupplierUsers() {
  let { data: suppliers, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "supplier");
  if (error) {
    console.log(error);
    throw new Error("Unable to get suppliers.");
  }

  return suppliers;
}

export async function getSupplierById(id) {
  let { data: supplier, error } = await supabase
    .from("supplier")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
    throw new Error("Opps! Supplier not fetched");
  }
  return supplier;
}
