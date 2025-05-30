"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../_utils/supabase/server";
import { getCurrentUser } from "./getCurrentUser";
import { redirect } from "next/navigation";
import { deleteImagesFromBucket, uploadSingleImageToBucket } from "./helpers";

export async function createPackage(packageData, formData) {
  const supabase = await createClient();
  // check if user is login and user is admin
  const user = await getCurrentUser();
  if (!user || user?.user_metadata.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  // General vars
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  //   get formData
  const name = formData.get("name");
  const price_band = Number(formData.get("price_band"));
  const add_ons = formData.get("add_ons")?.split(",");
  const tags = formData.get("tags")?.split(",");
  const image = formData.get("image");
  const blurb = formData.get("blurb")?.slice(0, 1000);
  const group_size = formData.get("group_size");
  const duration = formData.get("duration");
  const recommended_Time = formData.get("recommended_Time");
  const inclusions = packageData.selected.map((cur) => cur.label);

  //   check for empty fields
  if (
    !name ||
    !price_band ||
    // !tags ||
    !blurb ||
    !inclusions ||
    // !add_ons ||
    !group_size ||
    !duration ||
    !recommended_Time ||
    !image
  )
    return { error: "Please fill required fields." };

  // image validation
  if (image && image.size > 0) {
    if (!ALLOWED_TYPES.includes(image.type)) {
      return { error: "Image: Only JPG, PNG, and WEBP files are allowed" };
    }
    // image size constraints
    if (image.size > MAX_FILE_SIZE) {
      return { error: "Image size must be less than 1MB" };
    }
  }

  const imageName = `${Math.random()}-${image.name}`;
  const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/packag-images/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from("packag-images")
    .upload(imageName, image);
  if (storageError) {
    console.log(storageError);
    return { error: "Some internal error has occurred while uploading image" };
  }
  //   ready package data
  const packagePayloadData = {
    name,
    price_band,
    add_ons,
    group_size,
    tags,
    inclusions,
    blurb,
    duration,
    recommended_Time,
    image: imagePath,
  };
  //   add package and check possible error
  const { error: packageError } = await supabase
    .from("Packages")
    .insert([packagePayloadData])
    .select();
  if (packageError) {
    console.log(packageError);
    return { error: "Something went wrong on the server" };
  }

  //   revalidate and redirects
  revalidatePath("/dashboard/packages");
  redirect("/dashboard/packages");
}

export async function deletePackage(packageId, imageUrl) {
  const supabase = await createClient();
  // check if user is login and user is admin
  const user = await getCurrentUser();
  if (!user || user?.user_metadata.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  let imagePath = imageUrl?.split("/").pop();

  // delete image from the bucket
  if (imagePath) {
    const { error: storageError } = await supabase.storage
      .from("packag-images")
      .remove([imagePath]);

    if (storageError) {
      console.log(storageError);
      return { error: "Unable to delete package. Please try again later." };
    }
  }
  // remove package
  const { error: packageError } = await supabase
    .from("Packages")
    .delete()
    .eq("id", packageId);
  if (packageError)
    return { error: "Unable to delete package. Please try again later." };

  revalidatePath("/dashboard/packages");
}

export async function updatePackage(updatedPackageData, formData) {
  const supabase = await createClient();

  // check if user is login and user is admin
  const user = await getCurrentUser();
  if (!user || user?.user_metadata.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  // General vars
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  //   get formData
  const name = formData.get("name");
  const price_band = Number(formData.get("price_band"));
  const add_ons = formData.get("add_ons")?.split(",");
  const tags = formData.get("tags")?.split(",");
  const image = formData.get("image");
  const blurb = formData.get("blurb")?.slice(0, 1000);
  const group_size = formData.get("group_size");
  const duration = formData.get("duration");
  const recommended_Time = formData.get("recommended_Time");
  const oldImage = formData.get("oldImage");
  const packageId = updatedPackageData.packageId;
  const inclusions = updatedPackageData.selected.map((cur) => cur.label);

  //   check for empty fields
  if (
    !name ||
    !price_band ||
    // !tags ||
    !blurb ||
    !inclusions ||
    // !add_ons ||
    !group_size ||
    !duration ||
    !recommended_Time
  )
    return { error: "Please fill required fields." };

  // image validation
  if (image && image.size > 0) {
    if (!ALLOWED_TYPES.includes(image.type)) {
      return { error: "Image: Only JPG, PNG, and WEBP files are allowed" };
    }
    // image size constraints
    if (image.size > MAX_FILE_SIZE) {
      return { error: "Image size must be less than 1MB" };
    }
  }

  let imagePath;
  // Image Operation
  if (image && image.size > 0) {
    // upload new image
    const resUpload = await uploadSingleImageToBucket(
      supabase,
      image,
      "packag-images",
    );
    imagePath = resUpload.publicUrl;
    if (resUpload.error) return { error: resUpload.error };
    // delete old image
    const resDelete = await deleteImagesFromBucket(
      supabase,
      [oldImage],
      "packag-images",
    );

    if (resDelete?.error) {
      return { error: resDelete?.error };
    }
  }

  // update package
  const updatePackageData = {
    name,
    inclusions,
    add_ons,
    tags,
    price_band,
    image: imagePath,
    blurb,
    group_size,
    duration,
    recommended_Time,
  };
  const { error } = await supabase
    .from("Packages")
    .update(updatePackageData)
    .eq("id", packageId)
    .single();
  if (error) return { error: "Unable to update package. Please try again" };

  // Revalidation
  revalidatePath(`/dashboard/packages/edit-package/${packageId}`);
  revalidatePath("/dashboard/packages");
  // Redirection
  redirect("/dashboard/packages");
}
