"use server";

import { redirect } from "next/navigation";
import { createClient } from "../_utils/supabase/server";

import { getCurrentUser } from "./getCurrentUser";
import { revalidatePath } from "next/cache";

export async function addSupplierAction(formData) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user || user?.user_metadata.role !== "admin")
    return { error: "You are not allowed to perform this action" };
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");

  if (!name || !email || !phone)
    return { error: "Please fill required fields" };

  const supplierData = { name, email, phone };

  const { error } = await supabase
    .from("supplier")
    .insert([supplierData])
    .select();

  if (error) {
    console.log(error);
    return { error: "Oops! Something went wrong while adding the supplier" };
  }

  revalidatePath("/dashboard/supplier");
  redirect("/dashboard/supplier");
}

export async function deleteSupplier(id) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user || user?.user_metadata.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  const { error } = await supabase.from("supplier").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { error: "Oops! Something went wrong while deleting the supplier" };
  }

  revalidatePath("/dashboard/supplier");
}

export async function updateSupplier(formData) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user || user?.user_metadata.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const supplierId = Number(formData.get("supplierId"));

  if (!name || !email || !phone)
    return { error: "Please fill required fields" };

  const updateData = { name, email, phone };
  const { error } = await supabase
    .from("supplier")
    .update(updateData)
    .eq("id", supplierId);

  if (error) {
    console.log(error);
    return { error: "Unable to update supplier" };
  }

  revalidatePath(`/dashboard/supplier/edit-supplier/${supplierId}`);
  revalidatePath("/dashboard/supplier");
  redirect("/dashboard/supplier");
}
