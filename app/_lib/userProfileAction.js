"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_utils/supabase/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";
import Link from "next/link";

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
  const email = formData.get("email");
  const password = formData.get("password");
  const { data: user, error: verifiedUserError } = await supabase
    .from("users")
    .select("isVerified")
    .eq("email", email)
    .single();
  if (user && !user?.isVerified)
    return {
      custom: true,
      error:
        "Your account is under review. You will receive an email once your account is approved by the admin.",
    };

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.message === "Email not confirmed") {
      return {
        error: "Your email is not verified yet. Please wait for approval.",
      };
    }

    return {
      error: "Invalid login credentials!",
    };
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
  const role = formData.get("role");

  // Step 1: Check if user already exists
  const { data: existingUsers, error: fetchError } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (existingUsers) {
    return { error: "This email is already registered. Try logging in." };
  }

  // step 2: insert user in supabase auth table
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login?type=signup`,
      data: {
        full_name: name,
        role: role ? role : "organiser",
      },
    },
  });
  if (signUpError) {
    console.error("Supabase Auth Signup Error:", signUpError.message);
    const message =
      signUpError.message === "User already registered"
        ? "This email is already registered. Try logging in."
        : "Unable to create your account. Please check your email or try again later.";
    return { error: message };
  }

  // step 3 insert user in custom user table
  const userId = data?.user?.id;
  if (!userId)
    return { error: "Unable to complete signup — your ID was not generated." };

  const { error: profileError } = await supabase.from("users").insert([
    {
      id: userId,
      email,
      isVerified: false,
      fullName: name,
      role: role ? role : "organiser", // same as above or adjust as needed
    },
  ]);

  if (profileError) {
    console.error("Supabase Custom User Table Error:", profileError.message);

    const errorMsg = profileError.message.includes("foreign key constraint")
      ? `Signup failed due to system conflict. Please contact support. (support@dxbstagparties.com)`
      : "Could not complete signup. Please try again later.";

    return { error: errorMsg };
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
  if (!email) return { error: "Please enter email." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    console.log(error);
    return {
      error:
        "Invalid email or user may not found with this email. Try correct email",
    };
  }
  const { error: resetError } =
    await supabase.auth.resetPasswordForEmail(email);
  const { error: signOutError } = await supabase.auth.signOut();
  if (resetError || signOutError) {
    console.log(resetError);
    return { error: "Error while sending password reset link" };
  }
  revalidatePath("/forgot-password");
  revalidatePath("/");
}

export async function resetPassword(formData) {
  const supabase = await createClient();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // check if field are empty
  if (!password || !confirmPassword)
    return { error: "Please fill all fields." };
  // check the password should be same
  if (password !== confirmPassword)
    return { error: "Password should be same." };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    console.log(error);
    return {
      error: "Sorry, this link has expired. Please request a fresh one.",
    };
  }
  revalidatePath("/reset-password");
  redirect("/login");
}

export async function verifyUser(userId) {
  const user = await getCurrentUser();
  const supabase = await createClient();
  if (!user || user?.user_metadata?.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  // update user
  const { error } = await supabase
    .from("users")
    .update({ isVerified: true })
    .eq("id", userId);
  if (error) {
    console.log(error);
    return { error: "Something went wrong. Please try again later" };
  }
  revalidatePath("/dashboard/users");
}
