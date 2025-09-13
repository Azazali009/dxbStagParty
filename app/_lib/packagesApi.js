import { createClient } from "../_utils/supabase/client";

const supabase = createClient();

export async function getPackages() {
  let { data: Packages, error } = await supabase.from("Packages").select("*");
  if (error) {
    console.log(error);
    throw new Error("Unable to load packages");
  }
  return Packages;
}
export async function getPackageById(id) {
  let { data: Packages, error } = await supabase
    .from("Packages")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Unable to load package");
  }
  return Packages[0];
}
