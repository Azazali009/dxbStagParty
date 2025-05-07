"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "./adminSupabase";

import {
  createActivity,
  getActivity,
  getBookingByUserId,
} from "./data-services";
import { extractImagePath } from "./helpers";
import { supabase } from "./supabase";
import { getCurrentUser } from "./getCurrentUser";

export async function addActivityAction(formData) {
  // check if user is login and user is admin
  const user = await getCurrentUser();
  if (!user || user?.user_metadata.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  // General vars
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const name = formData.get("name").slice(0, 100);
  const price = Number(formData.get("price"));
  const duration = formData.get("duration").slice(0, 100);
  const minAge = formData.get("minAge");
  const destinations = formData.get("destinations").slice(0, 100);
  const description = formData.get("description").slice(0, 1000);
  const group_size = formData.get("group_size");
  const tags = formData.get("tags")?.split(",");
  const image = formData.get("image");
  const bannerImage = formData.get("bannerImage");

  // empty fields
  if (
    !duration ||
    !description ||
    !destinations ||
    !tags ||
    !image ||
    !bannerImage ||
    !group_size ||
    !name ||
    !minAge ||
    !price
  )
    return { error: "Please fill required fields" };

  // image type validation
  if (image || bannerImage) {
    if (
      !ALLOWED_TYPES.includes(image.type) ||
      !ALLOWED_TYPES.includes(bannerImage.type)
    ) {
      return { error: "Image: Only JPG, PNG, and WEBP files are allowed" };
    }
    // image size constraints
    if (image.size > MAX_FILE_SIZE) {
      return { error: "Card image size must be less than 1MB" };
    }
    if (bannerImage.size > MAX_FILE_SIZE) {
      return { error: "Banner Image size must be less than 1MB" };
    }
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
    bannerImage,
  };
  await createActivity(newActivity);

  revalidatePath("/dashboard/activities");

  redirect("/dashboard/activities");
}

export async function editActivityAction(formData) {
  // General vars
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  // Get form data
  const name = formData.get("name")?.slice(0, 100);
  const price = Number(formData.get("price"));
  const duration = formData.get("duration")?.slice(0, 100);
  const minAge = Number(formData.get("minAge"));
  const destinations = formData.get("destinations")?.slice(0, 100);
  const description = formData.get("description")?.slice(0, 1000);
  const group_size = formData.get("group_size");
  const tags = formData.get("tags")?.split(",");
  const image = formData.get("image");
  const bannerImage = formData.get("bannerImage");
  const existingImage = formData.get("existingImage");
  const existingBannerImage = formData.get("existingBannerImage");
  const activityId = Number(formData.get("activityId"));

  // Check validity
  const isValidImage = image && image.size > 0 && image.name !== "undefined";
  const isValidBanner =
    bannerImage && bannerImage.size > 0 && bannerImage.name !== "undefined";

  const finalImage = isValidImage ? image : existingImage;
  const finalBannerImage = isValidBanner ? bannerImage : existingBannerImage;

  if (
    !duration ||
    !description ||
    !destinations ||
    !tags ||
    !price ||
    !name ||
    !image ||
    !bannerImage ||
    !group_size ||
    !minAge
  )
    return { error: "Please fill required fields" };

  if (
    isValidImage &&
    (!ALLOWED_TYPES.includes(image.type) || image.size > MAX_FILE_SIZE)
  ) {
    return { error: "Main image must be J, PNG or WEBP and less than 1MB" };
  }

  if (
    isValidBanner &&
    (!ALLOWED_TYPES.includes(bannerImage.type) ||
      bannerImage.size > MAX_FILE_SIZE)
  ) {
    return { error: "Banner image must be J, PNG or WEBP and less than 1MB" };
  }

  const imageName = `card-image-${Math.random()}-${finalImage?.name}`;
  const bannerImageName = `banner-image-${Math.random()}-${finalBannerImage?.name}`;

  const imagePath = !isValidImage
    ? finalImage
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/activity-images/${imageName}`;

  const bannerPath = !isValidBanner
    ? finalBannerImage
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/activity-images/${bannerImageName}`;

  const updateActivity = {
    name,
    price,
    duration,
    minAge,
    destinations,
    description,
    group_size,
    tags,
    image: imagePath,
    bannerImage: bannerPath,
  };

  const { error } = await supabase
    .from("activities")
    .update(updateActivity)
    .eq("id", activityId)
    .single();

  if (error) {
    console.log(error);
    return { error: "Error while updating Activity." };
  }

  // Upload and delete old images if new ones are uploaded
  if (isValidImage) {
    await supabase.storage.from("activity-images").upload(imageName, image);
    const oldImagePath = existingImage?.split("/").pop();
    if (oldImagePath) {
      await supabase.storage.from("activity-images").remove([oldImagePath]);
    }
  }

  if (isValidBanner) {
    await supabase.storage
      .from("activity-images")
      .upload(bannerImageName, bannerImage);
    const oldBannerPath = existingBannerImage?.split("/").pop();
    if (oldBannerPath) {
      await supabase.storage.from("activity-images").remove([oldBannerPath]);
    }
  }

  revalidatePath(`/dashboard/edit-activity/${activityId}`);
  revalidatePath("/dashboard/activities");

  return redirect("/dashboard/activities");
}

export async function deleteActivityAction(activityId) {
  const user = await getCurrentUser();
  const activity = await getActivity(activityId);
  const imageUrl = activity?.image;
  const bannerImageUrl = activity?.bannerImage;

  // function to extract image path

  const imagePath = extractImagePath(imageUrl)?.replace(/^\/+/, "");
  const bannerImagePath = extractImagePath(bannerImageUrl)?.replace(/^\/+/, "");

  if (!user || user?.user_metadata?.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  // 1. Delete image from bucket
  const { error: imageError } = await supabase.storage
    .from("activity-images")
    .remove([imagePath, bannerImagePath]);

  if (imageError)
    return { error: "Some internal error occurs while deleteing an activity" };

  // 2 delete activity
  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", activityId);

  if (error) return { error: "Unable to delete activity. Please try again!" };

  revalidatePath("/dashboard/activities");
}

export async function deleteUserAction(userId) {
  // check if user is login and user is admin
  const user = await getCurrentUser();

  if (!user || user?.user_metadata?.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  // // Get all bookings of the user
  const bookings = await getBookingByUserId(userId);
  // Get all booking Ids
  const bookingIds = bookings?.map((b) => b.id);

  if (bookingIds.length > 0) {
    // 2. Delete attendees linked to these bookings
    const { error: attendeeDeleteError } = await supabase
      .from("attendee")
      .delete()
      .in("bookingID", bookingIds);

    if (attendeeDeleteError) {
      return { error: "Failed to delete attendee data." };
    }

    // 3. Delete bookings
    const { error: bookingDeleteError } = await supabase
      .from("booking")
      .delete()
      .in("id", bookingIds);

    if (bookingDeleteError) {
      return { error: "Failed to delete booking data." };
    }
  }
  // delete normal user from custom user table
  const { error: customUserError } = await supabaseAdmin
    .from("users")
    .delete()
    .eq("id", userId);
  if (customUserError) {
    return { error: "Unexpected Error has occurred." };
  }
  // Delete built in user table user
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.log(error.message);
    return { error: "Unexpected Error has occurred." };
  }
  revalidatePath("/dashboard/users");
}

export async function createUserByAdmin(formData) {
  // const session = await auth();
  const user = await getCurrentUser();
  if (!user || user?.user_metadata.role !== "admin")
    throw new Error("You are not allowed to perform this action");

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");
  // Step 1: Auth create
  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: name,
        role,
        // avatar: 'https://example.com/avatar.png'
      },
    });

  if (authError) {
    console.error("Error creating auth user:", authError.message);
    return { error: "There was an issue while creating new user account." };
  }

  const userId = authData.user.id;
  const userData = { id: userId, fullName: name, role: role, email };
  // Step 2: Profile create
  const { error: userError } = await supabase.from("users").insert([userData]);

  if (userError) {
    console.error("Error creating profile:", userError.message);
    return { error: "There was an issue while creating new user account." };
  }

  // return authData.user;
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}
export async function updateBookingPaymentStatus(updateBookingData, formData) {
  // Check if user is logged in and is an admin
  const user = await getCurrentUser();
  if (!user || user?.user_metadata?.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  // Get data from form
  const paymentStatus = formData.get("paymentStatus");
  const bookingId = formData.get("bookingId");

  if (paymentStatus === "null" || paymentStatus === "")
    return { error: "Please select a valid option." };

  // If status is 'completed', update attendee table
  if (paymentStatus === "completed") {
    const { error: attendeeError } = await supabase
      .from("attendee")
      .update({ status: "paid" })
      .eq("bookingID", bookingId);

    if (attendeeError)
      return {
        error:
          "The attendee could not be found. They may have been removed or do not exist.",
      };
  }

  // Conditionally prepare booking update payload
  const bookingUpdatePayload =
    paymentStatus === "cancelled"
      ? { paymentStatus, totalPrice: 0 }
      : { ...updateBookingData, paymentStatus };

  // Update booking table
  const { error: bookingError } = await supabase
    .from("booking")
    .update(bookingUpdatePayload)
    .eq("id", bookingId);

  if (bookingError)
    return { error: "Unable to update booking. Please try again." };

  revalidatePath(`/dashboard/bookings/${bookingId}`);
}
