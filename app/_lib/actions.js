"use server";

import { redirect } from "next/navigation";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { createActivity, editActivity } from "./data-services";
import { minTime } from "date-fns/constants";

// delete
export async function test(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error("Could not signIn");
  }

  revalidatePath("/account");
  redirect("/account");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/verify-login" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function addActivityAction(formData) {
  // check if user is login and user is admin
  const session = await auth();
  if (!session || session?.user?.role !== "admin")
    throw new Error("You are not allowed to perform this action");

  // General vars
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const alphaNumericRegex = /^[A-Za-z0-9 ]{3,100}$/;
  const numericRegex = /^[1-9]{1,10}$/;

  const name = formData.get("name").slice(0, 100);
  const price = Number(formData.get("price"));
  const duration = formData.get("duration").slice(0, 100);
  const minAge = formData.get("minAge");
  const destinations = formData.get("destinations").slice(0, 100);
  const description = formData.get("description").slice(0, 1000);
  const group_size = formData.get("group_size");
  const tags = formData.get("tags")?.split(",");
  const image = formData.get("image");

  // empty fields
  if (!duration || !description || !destinations || !tags)
    throw new Error("Please fill required fields");
  // // form alphaNumerci value fields validation
  // if (!alphaNumericRegex.test(name) || !alphaNumericRegex.test(destinations))
  //   throw new Error("Please enter between 3 and 100 characters to continue.");
  // // form numerci value fields validation
  // if (!numericRegex.test(price) || !numericRegex.test(minAge))
  //   throw new Error(
  //     "Oops! Price and minimum age must be valid numbers(1-10) only.",
  //   );
  // // for group size only
  // if (!/^(\d{1,2})-(\d{1,2})$/.test(group_size)) {
  //   throw new Error(
  //     "Please use valid formate for group size, separate two numbers with dash separator",
  //   );
  // }
  // image type validation
  if (!ALLOWED_TYPES.includes(image.type)) {
    throw new Error("Image: Only JPG, PNG, and WEBP files are allowed");
  }
  // image size constraints
  if (image.size > MAX_FILE_SIZE) {
    throw new Error("File size must be less than 1MB");
  }
  const newActivity = {
    name,
    price,
    duration,
    minAge,
    destinations,
    description,
    group_size,
    tags,
    image,
  };
  await createActivity(newActivity);
}

export async function editActivityAction(formData) {
  // check if user is login and user is admin
  const session = await auth();
  if (!session || session?.user?.role !== "admin")
    throw new Error("You are not allowed to perform this action");

  // General vars
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const alphaNumericRegex = /^[A-Za-z0-9 ]{3,100}$/;
  const numericRegex = /^[0-9]{1,100}$/;

  const name = formData.get("name").slice(0, 100);
  const price = Number(formData.get("price"));
  const duration = formData.get("duration").slice(0, 100);
  const minAge = Number(formData.get("minAge"));
  const destinations = formData.get("destinations").slice(0, 100);
  const description = formData.get("description").slice(0, 1000);
  const group_size = formData.get("group_size");
  const tags = formData.get("tags")?.split(",");
  const image = formData.get("image");
  const existingImage = formData.get("existingImage");
  const activityId = Number(formData.get("activityId"));

  const isValidFile = image && image.size > 0 && image.name !== "undefined";
  const finalImage = isValidFile ? image : existingImage;
  // empty fields
  if (!duration || !description || !destinations || !tags || !price || !name)
    throw new Error("Please fill required fields");
  // form alphaNumerci value fields validation
  // if (!alphaNumericRegex.test(name) || !alphaNumericRegex.test(destinations))
  //   throw new Error("Please enter between 3 and 100 characters to continue.");
  // // form numerci value fields validation
  // if (!numericRegex.test(price) || !numericRegex.test(minAge))
  //   throw new Error("Oops! Price and minimum age must be valid numbers.");
  // for group size only
  if (!/^(\d{1,2})-(\d{1,2})$/.test(group_size)) {
    throw new Error(
      "Please use valid formate for group size, separate two numbers with dash separator",
    );
  }

  if (isValidFile) {
    if (!ALLOWED_TYPES.includes(image.type)) {
      throw new Error("Image: Only JPG, PNG, and WEBP files are allowed");
    }

    if (image.size > MAX_FILE_SIZE) {
      throw new Error("File size must be less than 1MB");
    }
  }
  const updateActivity = {
    name,
    price,
    duration,
    minAge,
    destinations,
    description,
    group_size,
    tags,
    image: finalImage,
  };

  const imageName = `${Math.random()}-${finalImage?.name}`;
  const imagePath = !isValidFile
    ? finalImage
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/activity-images/${imageName}`;

  const { data, error } = await supabase
    .from("activities")
    .update({ ...updateActivity, image: imagePath })
    .eq("id", activityId)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Error while updating Activity.😒");
  }
  if (!isValidFile) return data;
  const { error: storageError } = await supabase.storage
    .from("activity-images")
    .upload(imageName, image);

  if (storageError) {
    console.log(error);
    throw new Error(
      "Activity image could not updated due to some internal error. Please try again",
    );
  }

  revalidatePath(`/dashboard/edit-activity/${activityId}`);
  revalidatePath("/dashboard/activities");
}
