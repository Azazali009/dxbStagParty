"use server";

import { redirect } from "next/navigation";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { createActivity } from "./data-services";

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
  await signIn("google", { redirectTo: "/account" });
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
  const alphaNumericRegex = /^[A-Za-z0-9]{3,20}$/;
  const numericRegex = /^[0-9]{1,4}$/;

  const name = formData.get("name");
  const price = Number(formData.get("price"));
  const duration = formData.get("duration");
  const minAge = formData.get("minAge");
  const destinations = formData.get("destinations");
  const description = formData.get("description");
  const group_size = formData.get("group_size");
  const tags = formData.get("tags")?.split(",");
  const image = formData.get("image");

  // form alpha numerci value fields validation
  if (!alphaNumericRegex.test(name))
    throw new Error("Please provide a valid Name");
  // form numerci value fields validation
  if (!numericRegex.test(price))
    throw new Error("Please provide a valid price");
  // image type validation
  if (!ALLOWED_TYPES.includes(image.type)) {
    throw new Error("Only JPG, PNG, and WEBP files are allowed");
  }
  // image size constraints
  if (image.size > MAX_FILE_SIZE) {
    throw new Error("File size must be less than 2MB");
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
  };
  await createActivity(newActivity);
}
