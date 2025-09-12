"use server";

import { redirect } from "next/navigation";
import { createClient } from "../_utils/supabase/server";

import { getCurrentUser } from "./getCurrentUser";
import { revalidatePath } from "next/cache";
import {
  ALLOWED_TYPES,
  extractAndValidateFormData,
  getStoragePathFromUrl,
  MAX_FILE_SIZE,
} from "./helpers";
import { supabaseAdmin } from "./adminSupabase";
import { updateUser } from "./apiUser";

// export async function addSupplierAction(formData) {
//   const supabase = await createClient();
//   const user = await getCurrentUser();
//   if (!user || user?.user_metadata.role !== "admin")
//     return { error: "You are not allowed to perform this action" };
//   const name = formData.get("name");
//   const email = formData.get("email");
//   const phone = formData.get("phone");

//   if (!name || !email || !phone)
//     return { error: "Please fill required fields" };

//   const supplierData = { name, email, phone };

//   const { error } = await supabase
//     .from("supplier")
//     .insert([supplierData])
//     .select();

//   if (error) {
//     console.log(error);
//     return { error: "Oops! Something went wrong while adding the supplier" };
//   }

//   revalidatePath("/dashboard/supplier");
//   redirect("/dashboard/supplier");
// }

// export async function addAndApplySupplierAction(data) {
//   const supabase = await createClient();
//   const user = await getCurrentUser();
//   const {
//     urls,
//     selectedActivities,
//     bankDetails,
//     validateOnly,
//     isForApply,
//     range,
//   } = data;

//   const isFromAdmin = !isForApply; // Reverse for clarity

//   // check the form should from admin side and the current user role should be an admin
//   if (isFromAdmin && (!user || user?.user_metadata?.role !== "admin")) {
//     return { error: "You are not allowed to perform this action" };
//   }
//   const activityIds = selectedActivities?.map((activity) => activity?.value);

//   // Optional fields for validation
//   const optionalFields = [
//     "short_description",
//     "full_description",
//     "custom_booking_notes",
//   ];

//   // Validate form
//   const result = extractAndValidateFormData(formData, optionalFields);
//   if (!result?.valid) return { error: result?.error };

//   // 🛑 If only validating, exit here — don’t insert
//   if (validateOnly) return { success: true };

//   const formDataObject = result?.data;
//   const {
//     locations,
//     languages,
//     available_hours,
//     blackout_dates,
//     add_ons,
//     activity_tags,
//     safety_certifications,
//     email,
//     name,
//     role,
//   } = formDataObject;

//   // exclude password field -> because we do not want to add password in supplier table
//   const { password, ...filteredFormData } = formDataObject;

//   // Transform fields
//   const locationArr = locations?.split(",");
//   const languagesArr = languages?.split(",");
//   const available_hoursArr = available_hours?.split(",");
//   const blackout_datesArr = blackout_dates?.split(",");
//   const add_onsArr = add_ons?.split(",") ?? null;
//   const activity_tagsArr = activity_tags?.split(",");
//   const safety_certificationsArr = safety_certifications?.split(",");

//   let user_id;
//   let authErrorMessage = "";

//   if (isFromAdmin) {
//     // Admin creating a new user
//     const { data: newUser, error: signUpError } =
//       await supabaseAdmin.auth.admin.createUser({
//         email,
//         password,
//         email_confirm: true,
//         user_metadata: {
//           full_name: name,
//           role: role ?? "supplier",
//         },
//       });

//     if (signUpError) {
//       console.error("Admin Signup Error:", signUpError.message);
//       authErrorMessage =
//         signUpError.message.includes("already been registered") ||
//         signUpError.message.includes("User already registered")
//           ? "This email is already registered. Try logging in."
//           : "Unable to create the account. Please try again.";
//       return { error: authErrorMessage };
//     }

//     user_id = newUser?.user?.id;
//   } else {
//     // Normal user creating own account via admin client (server-side)
//     const { data: newUser, error: signUpError } =
//       await supabaseAdmin.auth.admin.createUser({
//         email,
//         password,
//         email_confirm: true,
//         user_metadata: {
//           full_name: name,
//           role: role ?? "supplier",
//         },
//       });

//     if (signUpError) {
//       console.error("Signup Error:", signUpError.message);
//       authErrorMessage = signUpError.message.includes("already been registered")
//         ? "This email is already registered. Try logging in."
//         : "Unable to create your account. Please try again.";
//       return { error: authErrorMessage };
//     }

//     user_id = newUser?.user?.id;
//   }

//   const { data: existingUser, error: fetchError } = await supabase
//     .from("users")
//     .select("id")
//     .eq("email", email)
//     .single();

//   if (existingUser) {
//     return { error: "This email is already registered." };
//   }

//   // insert user in custom user table
//   if (!user_id)
//     return { error: "Unable to complete action — your ID was not generated." };

//   const { error: profileError } = await supabase.from("users").insert([
//     {
//       id: user_id,
//       email,
//       isVerified: false,
//       fullName: name,
//       role: role ? role : "supplier",
//     },
//   ]);
//   if (profileError) {
//     console.error("Supabase Custom User Table Error:", profileError.message);

//     const errorMsg = profileError.message.includes("foreign key constraint")
//       ? `Signup failed due to system conflict. Please contact support. (support@dxbstagparties.com)`
//       : "Could not complete signup. Please try again later.";

//     return { error: errorMsg };
//   }
//   // Final supplier data

//   const newSupplier = {
//     ...filteredFormData,
//     activityIds,
//     locations: locationArr,
//     languages: languagesArr,
//     gallery: urls?.length > 0 ? urls : null,
//     available_hours: available_hoursArr,
//     blackout_dates: blackout_datesArr,
//     add_ons: add_onsArr,
//     bank_details: bankDetails,
//     activity_tags: activity_tagsArr,
//     safety_certifications: safety_certificationsArr,
//     user_id,
//     blackout_start: range?.from,
//     blackout_end: range?.to,
//   };

//   // Insert supplier into supplier table
//   const { error: insertError } = await supabase
//     .from("supplier")
//     .insert([newSupplier])
//     .select();

//   if (insertError) {
//     console.log(insertError);
//     return { error: "Error while submitting application." };
//   }
//   if (isForApply) {
//     redirect("/login");
//   }
//   return { success: true };
// }

export async function addAndApplySupplierAction(data) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  const {
    urls,
    validateOnly,
    isForApply,
    range,
    selectedActivities,
    bankDetails,
    name,
    email,
    password,
    locations,
    languages,
    available_hours,
    add_ons,
    safety_certifications,
    ...rest
  } = data;

  const isFromAdmin = !isForApply;

  // ✅ Admin-only restriction
  if (isFromAdmin && (!user || user?.user_metadata?.role !== "admin")) {
    return { error: "You are not allowed to perform this action" };
  }

  // ✅ Validation
  const optionalFields = [
    "short_description",
    "full_description",
    "custom_booking_notes",
    "role",
  ];
  const validation = extractAndValidateFormData(data, optionalFields);
  if (!validation.valid) return { error: validation.error };

  if (validateOnly) return { success: true };

  let user_id;
  let authErrorMessage = "";

  // ✅ Create user via Admin client (no anonymous issue)
  const { data: newUser, error: signUpError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: name,
        role: "supplier",
      },
    });

  if (signUpError) {
    console.error("Signup Error:", signUpError.message);
    authErrorMessage = signUpError.message.includes("already been registered")
      ? "This email is already registered. Try logging in."
      : "Unable to create your account. Please try again.";
    return { error: authErrorMessage };
  }

  user_id = newUser?.user?.id;

  // ✅ Check if exists in custom users table
  // const { data: existingUser } = await supabase
  //   .from("users")
  //   .select("id")
  //   .eq("email", email)
  //   .single();

  // if (existingUser) {
  //   return { error: "This email is already registered." };
  // }

  // ✅ Insert user into custom users table
  const { error: profileError } = await supabase.from("users").insert([
    {
      id: user_id,
      email,
      isVerified: false,
      fullName: name,
      role: "supplier",
    },
  ]);

  if (profileError) {
    console.error("Supabase Custom User Table Error:", profileError.message);
    return { error: "Could not complete signup. Please try again later." };
  }

  // ✅ Transform fields
  const locationArr = locations?.split(",") ?? [];
  const languagesArr = languages?.split(",") ?? [];
  const available_hoursArr = available_hours?.split(",") ?? [];
  const add_onsArr = add_ons?.split(",") ?? [];
  // const activity_tagsArr = activity_tags?.split(",") ?? [];
  const safety_certificationsArr = safety_certifications?.split(",") ?? [];
  const activityIds = selectedActivities?.map((act) => act?.value) ?? [];

  // ✅ Prepare supplier object
  const newSupplier = {
    ...rest,

    name,
    email,
    role: "supplier",
    locations: locationArr,
    languages: languagesArr,
    gallery: urls?.length > 0 ? urls : null,
    available_hours: available_hoursArr,
    add_ons: add_onsArr,
    bank_details: bankDetails,
    safety_certifications: safety_certificationsArr,
    activityIds,
    user_id,
    blackout_start: range?.from ?? null,
    blackout_end: range?.to ?? null,
  };

  // ✅ Insert into supplier table
  const { error: insertError } = await supabase
    .from("supplier")
    .insert([newSupplier])
    .select();

  if (insertError) {
    console.log("Supplier Insert Error:", insertError);
    await supabaseAdmin.auth.admin.deleteUser(user_id);
    return { error: "Error while submitting application." };
  }

  if (isForApply) {
    redirect("/login");
  }

  return { success: true };
}

export async function updateSupplierAction(data) {
  const {
    id,
    newUrls = [],
    deleteUrls = [],
    password,
    oldImages,
    selectedActivities,
    bankDetails,
    range,
    userId,
    publicUrl,
    ...updateData
  } = data;

  const supabase = await createClient();

  // Purane record fetch
  const { data: oldData } = await supabase
    .from("supplier")
    .select("gallery")
    .eq("id", id)
    .single();

  const oldUrls = oldData?.gallery || [];

  // 1) Delete selected old images from bucket
  if (deleteUrls.length > 0) {
    const deletePaths = deleteUrls.map((url) => getStoragePathFromUrl(url));

    const { error: deleteSTorageError } = await supabase.storage
      .from("supplier-images")
      .remove(deletePaths);
    if (deleteSTorageError) return { error: "Image could not deleted." };
  }
  // 2) Merge images (purane jo delete nahi huye + naye)
  const finalUrls = [
    ...oldUrls.filter((url) => !deleteUrls.includes(url)),
    ...newUrls,
  ];

  // 3) Update record
  const { error } = await supabase
    .from("supplier")
    .update({
      ...updateData,
      activityIds: selectedActivities?.map((act) => act.value),
      blackout_start: range?.from,
      blackout_end: range?.to,
      bank_details: { bank: bankDetails?.bank, iban: bankDetails?.iban },
      avatar: publicUrl,
      gallery: finalUrls,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  // 4 update user data in user auth

  // upload image
  // const imageName = `${Math.random()}-${avatar.name}`;
  // const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user-avatar/${imageName}`;

  // image validation

  // if (avatar && avatar.size > 0) {
  //   if (!ALLOWED_TYPES.includes(avatar.type)) {
  //     return {
  //       error: "Please upload an image in JPEG, JPG, PNG, or WEBP format.",
  //     };
  //   }

  //   const { error: storageError } = await supabase.storage
  //     .from("user-avatar")
  //     .upload(imageName, avatar);

  //   if (storageError) {
  //     console.log(storageError);
  //     return {
  //       error:
  //         "We’re sorry, something went wrong while uploading your image. Please try again.”",
  //     };
  //   }
  // }
  // image size constraints
  // if (avatar.size > MAX_FILE_SIZE) {
  //   return { error: "Kindly ensure your image is under 1MB in size." };
  // }

  const stringPass = password?.toString();
  const authRes = await updateUser({
    full_name: updateData?.name,
    password: stringPass,
    userId,
    avatar: publicUrl,
  });
  if (authRes?.error) {
    return { error: authRes.error }; // ✅ server action me propagate
  }

  revalidatePath("dashboard/me");
}

// export async function addSupplierAction(data, formData) {
//   const supabase = await createClient();
//   const user = await getCurrentUser();
//   const { urls, selectedActivities, bankDetails, validateOnly } = data;

//   const activityIds = selectedActivities?.map((activity) => activity?.value);

//   // Optional fields for validation
//   const optionalFields = [
//     "short_description",
//     "full_description",
//     "custom_booking_notes",
//   ];

//   // Validate form
//   const result = extractAndValidateFormData(formData, optionalFields);
//   if (!result?.valid) return { error: result?.error };

//   // 🛑 If only validating, exit here — don’t insert
//   if (validateOnly) return { success: true };

//   // Transform fields
//   const formDataObject = result?.data;
//   const {
//     locations,
//     languages,
//     available_hours,
//     blackout_dates,
//     add_ons,
//     activity_tags,
//     safety_certifications,
//     password,
//   } = formDataObject;

//   const locationArr = locations?.split(",");
//   const languagesArr = languages?.split(",");
//   const available_hoursArr = available_hours?.split(",");
//   const blackout_datesArr = blackout_dates?.split(",");
//   const add_onsArr = add_ons?.split(",") ?? null;
//   const activity_tagsArr = activity_tags?.split(",");
//   const safety_certificationsArr = safety_certifications?.split(",");

//   // Final supplier data
//   const newSupplier = {
//     ...formDataObject,
//     activityIds,
//     locations: locationArr,
//     languages: languagesArr,
//     gallery: urls?.length > 0 ? urls : null,
//     available_hours: available_hoursArr,
//     blackout_dates: blackout_datesArr,
//     add_ons: add_onsArr,
//     bank_details: bankDetails,
//     activity_tags: activity_tagsArr,
//     safety_certifications: safety_certificationsArr,
//   };

//   // Insert into DB
//   const { error: insertError } = await supabase
//     .from("supplier")
//     .insert([newSupplier])
//     .select();

//   if (insertError) return { error: "Error while submitting application." };

//   return { success: true };
// }

// export async function applySupplierAction(data, formData) {
//   const supabase = await createClient();
//   const user = await getCurrentUser();
//   const { urls, selectedActivities, bankDetails, validateOnly } = data;

//   const activityIds = selectedActivities?.map((activity) => activity?.value);

//   // Optional fields for validation
//   const optionalFields = [
//     "short_description",
//     "full_description",
//     "custom_booking_notes",
//   ];

//   // Validate form
//   const result = extractAndValidateFormData(formData, optionalFields);
//   if (!result?.valid) return { error: result?.error };

//   // 🛑 If only validating, exit here — don’t insert
//   if (validateOnly) return { success: true };

//   // Transform fields
//   const formDataObject = result?.data;
//   const {
//     locations,
//     languages,
//     available_hours,
//     blackout_dates,
//     add_ons,
//     activity_tags,
//     safety_certifications,
//   } = formDataObject;

//   const locationArr = locations?.split(",");
//   const languagesArr = languages?.split(",");
//   const available_hoursArr = available_hours?.split(",");
//   const blackout_datesArr = blackout_dates?.split(",");
//   const add_onsArr = add_ons?.split(",") ?? null;
//   const activity_tagsArr = activity_tags?.split(",");
//   const safety_certificationsArr = safety_certifications?.split(",");

//   // Final supplier data
//   const newSupplier = {
//     ...formDataObject,
//     activityIds,
//     locations: locationArr,
//     languages: languagesArr,
//     gallery: urls?.length > 0 ? urls : null,
//     available_hours: available_hoursArr,
//     blackout_dates: blackout_datesArr,
//     add_ons: add_onsArr,
//     bank_details: bankDetails,
//     activity_tags: activity_tagsArr,
//     safety_certifications: safety_certificationsArr,
//   };

//   // Insert into DB
//   const { error: insertError } = await supabase
//     .from("supplier")
//     .insert([newSupplier])
//     .select();

//   if (insertError) return { error: "Error while submitting application." };

//   return { success: true };
// }

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
