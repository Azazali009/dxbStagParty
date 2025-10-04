import { createClient } from "../_utils/supabase/client";

const supabase = createClient();
export async function getSupplierUsers() {
  let { data: suppliers, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "supplier");

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
    return { error: "Opps! Supplier not fetched" };
  }
  return supplier;
}
export async function getSupplierBySUpplierId(supplierId) {
  let { data: supplier, error } = await supabase
    .from("supplier")
    .select("*")
    .eq("user_id", supplierId)
    .single();
  if (error) {
    console.log(error);
    return { error: "Opps! Supplier not fetched" };
  }
  return supplier;
}
