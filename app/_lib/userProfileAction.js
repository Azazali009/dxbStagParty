"use server";
import { revalidatePath } from "next/cache";
// import { auth } from "./auth";
import { createClient } from "../_utils/supabase/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";
// import { supabase } from "./supabase";

export async function updateUserProfileAction(formData) {
  const user = await getCurrentUser();
  const supabase = await createClient();
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  const userId = user.id;
  const fullName = formData.get("fullName")?.toString();
  const avatar = formData.get("avatar");
  const existingAvatar = formData.get("existingAvatar");
  const password = formData.get("password")?.toString();

  const imageName = `${Math.random()}-${avatar.name}`;
  const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user-avatar/${imageName}`;

  if (avatar && avatar.size > 0) {
    if (!ALLOWED_TYPES.includes(avatar.type)) {
      return {
        error: "Please upload an image in JPEG, JPG, PNG, or WEBP format.",
      };
    }
    // image size constraints
    if (avatar.size > MAX_FILE_SIZE) {
      return { error: "Kindly ensure your image is under 1MB in size." };
    }
    //   1. upload user image
    const { error: storageError } = await supabase.storage
      .from("user-avatar")
      .upload(imageName, avatar);
    // delete old image
    const oldImagePath = existingAvatar?.split("/").pop();
    if (oldImagePath) {
      await supabase.storage.from("user-avatar").remove([oldImagePath]);
    }
    if (storageError) {
      console.log(storageError);
      return {
        error:
          "We’re sorry, something went wrong while uploading your image. Please try again.”",
      };
    }
  }

  // 2. Update Supabase Auth metadata
  const updateData = {
    full_name: fullName,
  };

  if (avatar && avatar.size > 0) {
    updateData.avatar_url = imagePath;
  }
  const { error: authUpdateError } = await supabase.auth.updateUser({
    data: updateData,
    ...(password && { password }),
  });

  if (authUpdateError) {
    console.log(authUpdateError);
    return { error: "Failed to update your profile" };
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
    return { error: "Failed to update profile" };
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
    return { error: "Invalid login credentials!" };
  }

  revalidatePath("/", "layout");
  redirect("/verify-login");
}

export async function signup(formData) {
  const supabase = await createClient();

  // get form data
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // insert user in supabase auth table
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        role: "organiser",
      },
    },
  });
  if (error) {
    console.log(error);
    return { error: "Oops! Something went wrong while creating your account." };
  }

  // insert user in custom user table
  const userId = data?.user?.id;
  if (!userId)
    return { error: "Unable to complete signup — user ID was not generated." };

  // Step 2: Add to your custom 'users' table
  const { error: userError } = await supabase.from("users").insert([
    {
      id: userId,
      email,
      fullName: name,
      role: "organiser", // same as above or adjust as needed
    },
  ]);

  if (userError) {
    console.error("Error creating user profile:", userError.message);
    return { error: "Unable to create your account" };
  }
  redirect("/account");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/");
  redirect("/");
}

export async function forgotPassword(formData) {
  const email = formData.get("email");
  if (!email) throw new Error("Please enter email.");

  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    return {
      error:
        "Invalid email or user may not found with this email. Try correct email",
    };
  }
  const { error: resetError } = await supabase.auth.resetPasswordForEmail(
    email,
    { redirectTo: "https://dxb-stag-party.vercel.app/reset-password" },
  );
  if (resetError) {
    console.log(resetError);
    return { error: "Error while sending password reset link" };
  }
}

export async function resetPassword(formData) {
  const supabase = await createClient();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // check if field are empty
  if (!password || !confirmPassword)
    return { error: "Please fill all fields." };
  // check the password shoudl be same
  if (password !== confirmPassword)
    return { error: "Password should be same." };

  await supabase.auth.updateUser({ password });

  redirect("/login");
}
