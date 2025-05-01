"use server";
import { revalidatePath } from "next/cache";
// import { auth } from "./auth";
import { createClient } from "../_utils/supabase/server";
import { redirect } from "next/navigation";
// import { supabase } from "./supabase";

export async function updateUserProfileAction(formData) {
  // const session = await auth();

  // if (!session?.user) {
  //   throw new Error("You must be logged in to update your profile.");
  // }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const userId = user.id;
  const fullName = formData.get("fullName")?.toString();
  const avatar = formData.get("avatar")?.toString();
  const password = formData.get("password")?.toString();
  //   updateUserProfile({ userId, fullName });
  const imageName = `${Math.random()}-${avatar.name}`;
  const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user-avatar/${imageName}`;
  //   1. upload user image
  if (avatar && avatar.size > 0) {
    const { error: storageError } = await supabase.storage
      .from("user-avatar")
      .upload(imageName, avatar);

    if (storageError) {
      console.log(storageError);
      throw new Error("Some server error has occurred while uploading image.");
    }
  }

  // 2. Update Supabase Auth metadata
  const { error: authUpdateError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      avatar_url: imagePath,
    },
    ...(password && { password }),
  });

  if (authUpdateError) {
    console.log(authUpdateError);
    throw new Error("Failed to update Supabase Auth user");
  }
  // 3. Update your custom users table
  const { error: userTableError } = await supabase
    .from("users")
    .update({
      fullName,
      avatar: imagePath,
    })
    .eq("id", userId);

  if (userTableError) {
    throw new Error("Failed to update custom user profile");
  }

  revalidatePath("/account/profile");
}

export async function login(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.log(error);
    throw new Error(error?.message);
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    console.log(error);
  }
  // revalidatePath('/', 'layout')
  // redirect('/')
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/");
  redirect("/");
}
