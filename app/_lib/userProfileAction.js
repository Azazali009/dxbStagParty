"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_utils/supabase/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";
import Link from "next/link";
import { sendEmail } from "./sendEmail";

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
  const redirectToFromClient = formData.get("redirectTo");

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
  // redirect("/verify-login");
  // ✅ Forward redirectTo to verify-login
  const encodedRedirectTo = encodeURIComponent(redirectToFromClient);

  redirect(
    ` ${encodedRedirectTo !== "null" ? `/verify-login?redirectTo=${encodedRedirectTo}` : "/verify-login"} `,
  );
}

export async function signup(formData) {
  const supabase = await createClient();

  // get form data
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  // const role = formData.get("role");

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
        role: "organiser",
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
      role: "organiser", // same as above or adjust as needed
    },
  ]);

  if (profileError) {
    console.error("Supabase Custom User Table Error:", profileError.message);

    const errorMsg = profileError.message.includes("foreign key constraint")
      ? `Signup failed due to system conflict. Please contact support. (support@dxbstagparties.com)`
      : "Could not complete signup. Please try again later.";

    return { error: errorMsg };
  }
  await supabase.auth.signOut();
  redirect("/login");
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
  const { error: resetError } = await supabase.auth.resetPasswordForEmail(
    email,
    { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password` },
  );
  const { error: signOutError } = await supabase.auth.signOut();
  if (resetError || signOutError) {
    console.log(resetError);
    return { error: "Error while sending password reset link" };
  }
  revalidatePath("/forgot-password");
  revalidatePath("/");
}

export async function resetPassword(formData) {
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

export async function addVoteAction(data, formData) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  // 1. Parse form data
  const activities = data?.selectedActivities;
  const activityIds = activities && activities?.map((act) => act.value);
  const attendees = data?.attendees;

  if (!activities || activities.length < 3) {
    return { error: "Please select at least 3 activities." };
  }

  if (!attendees || attendees.length === 0) {
    return { error: "Please add at least one attendee." };
  }

  // 2. Generate link token & deadline
  const linkToken = Math.random().toString(36).slice(2, 12);
  const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  // 3. check current user
  if (!user) {
    return { error: "You must be logged in to create a voting session." };
  }

  // 4. Insert into voting_sessions
  const { error } = await supabase.from("voting_sessions").insert([
    {
      organiser_id: user.id,
      title: "Activity Vote",
      activity_ids: activityIds,
      voter_contacts: attendees, // JSONB
      status: "open",
      end_time: endTime,
      link_token: linkToken,
    },
  ]);

  if (error) {
    console.error(error);
    return { error: "Failed to create voting session." };
  }

  // ✅ Send voting link to all attendees
  const votingLink = `${process.env.NEXT_PUBLIC_SITE_URL}/vote/${linkToken}`;

  for (const attendee of attendees) {
    if (attendee.email) {
      await sendEmail({
        toEmail: attendee.email,
        subject: "You're invited to vote for an activity 🎯",
        message: `
              <div style="background-color:#0B0E1C; color:#E0B15E !important; padding:30px; font-family:sans-serif; text-align:center;">
                      <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="DXB Stag Parties Logo" style="width:120px; margin-bottom:20px;" />

                      <!-- TOP AD SLOT (placeholder / sellable space) -->
                        <div style="background:#E0B15E; color:#0B0E1C; padding:10px; font-size:14px; font-weight:bold; margin-bottom:24px; border-radius:6px;">
                          Your Ad Could Be Here — Promote Your Brand With DXB Stag Parties
                        </div>

                      <h1 style="font-size:24px; margin-bottom:20px; color:#E0B15E !important;">Vote for Your Favorite Activity</h1>
                      <p style="font-size:16px; margin-bottom:24px; color:#fff;">
                        You’ve been invited to vote for your preferred stag activity. Click the button below to cast your vote:
                      </p>
                      <a href="${votingLink}" 
                        style="display:inline-block; padding:12px 24px; background-color:#E0B15E; color:#0B0E1C; text-decoration:none; border-radius:50px; font-weight:bold;">
                        Vote Now
                      </a>
                      <p style="margin-top:30px; font-size:14px; color:#aaa;">
                        This link will expire in 24 hours. Please make sure to vote before the deadline.
                      </p>
                      <!-- BOTTOM AD SLOT (placeholder / sellable space) -->
                        <div style="background:#E0B15E; color:#0B0E1C; padding:10px; font-size:14px; font-weight:bold; margin-top:20px; border-radius:6px;">
                          Partner With Us — Contact <a href="${process.env.NEXT_PUBLIC_SITE_URL}/contact" style="color:#0B0E1C; text-decoration:underline;">DXB Stag Parties</a>
                        </div>
                </div>

        `,
      });
    }
  }

  redirect("/account/vote");
}
