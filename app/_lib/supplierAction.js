"use server";

import { redirect } from "next/navigation";
import { createClient } from "../_utils/supabase/server";

import { getCurrentUser } from "./getCurrentUser";
import { revalidatePath } from "next/cache";
import { extractAndValidateFormData } from "./helpers";

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
export async function applySupplierAction(data, formData) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  const { urls, selectedActivities } = data;
  const activityIds = selectedActivities?.map((activity) => activity?.value);

  // check error for empty fields
  const optionalFields = ["short_description", "full_description"];
  const result = extractAndValidateFormData(formData, optionalFields);
  if (!result?.valid) return { error: result?.error };

  const formDataObject = result?.data;
  const { locations, languages, available_hours, blackout_dates } =
    formDataObject;

  // convert text fields to an array for json data in supabase
  const locationArr = locations?.split(",");
  const languagesArr = languages?.split(",");
  const available_hoursArr = available_hours?.split(",");
  const blackout_datesArr = blackout_dates?.split(",");

  const newSupplier = {
    ...formDataObject,
    activityIds,
    locations: locationArr,
    languages: languagesArr,
    gallery: urls?.length > 0 ? urls : null,
    available_hours: available_hoursArr,
    blackout_dates: blackout_datesArr,
  };
  console.log(newSupplier);
  // add to supabase
  // const { data, error: inserError } = await supabase
  //   .from("supplier")
  //   .insert([newSupplier])
  //   .select();
  // if (inserError) return { error: "Error while submitting application." };
}

export async function deleteSupplier(id) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user || user?.user_metadata.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  const { error } = await supabase.from("users").delete().eq("id", id);
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
