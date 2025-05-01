"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "./adminSupabase";
import { auth, signIn, signOut } from "./auth";
import {
  createActivity,
  getActivity,
  getBookingByUserId,
} from "./data-services";
import { extractImagePath } from "./helpers";
import { supabase } from "./supabase";

export async function credentialsSignInAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  if (res?.error) throw new Error(res.error);

  revalidatePath("/account");
  redirect("/verify-login");
}

export async function signUpAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  // Step 1: Create user in Supabase Auth
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

  if (error) throw new Error(error.message);

  const userId = data.user?.id;
  if (!userId) throw new Error("User ID not found after signup");

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
    throw new Error(userError.message);
  }

  redirect("/login");
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
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
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
  if (image || bannerImage) {
    if (
      !ALLOWED_TYPES.includes(image.type) ||
      !ALLOWED_TYPES.includes(bannerImage.type)
    ) {
      throw new Error("Image: Only JPG, PNG, and WEBP files are allowed");
    }
    // image size constraints
    if (image.size > MAX_FILE_SIZE) {
      throw new Error("Card image size must be less than 1MB");
    }
    if (bannerImage.size > MAX_FILE_SIZE) {
      throw new Error("Banner Image size must be less than 1MB");
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

// export async function editActivityAction(formData) {
//   // check if user is login and user is admin
//   const session = await auth();
//   if (!session || session?.user?.role !== "admin")
//     throw new Error("You are not allowed to perform this action");

//   // General vars
//   const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
//   const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
//   const alphaNumericRegex = /^[A-Za-z0-9 ]{3,100}$/;
//   const numericRegex = /^[0-9]{1,100}$/;

//   const name = formData.get("name").slice(0, 100);
//   const price = Number(formData.get("price"));
//   const duration = formData.get("duration").slice(0, 100);
//   const minAge = Number(formData.get("minAge"));
//   const destinations = formData.get("destinations").slice(0, 100);
//   const description = formData.get("description").slice(0, 1000);
//   const group_size = formData.get("group_size");
//   const tags = formData.get("tags")?.split(",");
//   const image = formData.get("image");
//   const existingImage = formData.get("existingImage");
//   const existingBannerImage = formData.get("existingBannerImage");
//   const activityId = Number(formData.get("activityId"));

//   const isValidFile = image && image.size > 0 && image.name !== "undefined";
//   const finalImage = isValidFile ? image : existingImage;
//   // empty fields
//   if (!duration || !description || !destinations || !tags || !price || !name)
//     throw new Error("Please fill required fields");
//   // form alphaNumerci value fields validation
//   // if (!alphaNumericRegex.test(name) || !alphaNumericRegex.test(destinations))
//   //   throw new Error("Please enter between 3 and 100 characters to continue.");
//   // // form numerci value fields validation
//   // if (!numericRegex.test(price) || !numericRegex.test(minAge))
//   //   throw new Error("Oops! Price and minimum age must be valid numbers.");
//   // for group size only
//   // if (!/^(\d{1,2})-(\d{1,2})$/.test(group_size)) {
//   //   throw new Error(
//   //     "Please use valid formate for group size, separate two numbers with dash separator",
//   //   );
//   // }

//   if (isValidFile) {
//     if (!ALLOWED_TYPES.includes(image.type)) {
//       throw new Error("Image: Only JPG, PNG, and WEBP files are allowed");
//     }

//     if (image.size > MAX_FILE_SIZE) {
//       throw new Error("File size must be less than 1MB");
//     }
//   }
//   const updateActivity = {
//     name,
//     price,
//     duration,
//     minAge,
//     destinations,
//     description,
//     group_size,
//     tags,
//     image: finalImage,
//   };

//   const imageName = `card-image-${Math.random()}-${finalImage?.name}`;
//   const imagePath = !isValidFile
//     ? finalImage
//     : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/activity-images/${imageName}`;

//   const { error } = await supabase
//     .from("activities")
//     .update({ ...updateActivity, image: imagePath })
//     .eq("id", activityId)
//     .single();

//   if (error) {
//     console.log(error);
//     throw new Error("Error while updating Activity.😒");
//   }
//   if (!isValidFile) {
//     revalidatePath(`/dashboard/edit-activity/${activityId}`);
//     revalidatePath("/dashboard/activities");

//     return redirect("/dashboard/activities");
//   }
//   const { error: storageError } = await supabase.storage
//     .from("activity-images")
//     .upload(imageName, image);

//   if (storageError) {
//     console.log(error);
//     throw new Error(
//       "Activity image could not updated due to some internal error. Please try again",
//     );
//   }

//   revalidatePath(`/dashboard/edit-activity/${activityId}`);
//   revalidatePath("/dashboard/activities");

//   redirect("/dashboard/activities");
// }
// export async function editActivityAction(formData) {
//   const session = await auth();
//   if (!session || session?.user?.role !== "admin")
//     throw new Error("You are not allowed to perform this action");

//   const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
//   const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

//   const name = formData.get("name").slice(0, 100);
//   const price = Number(formData.get("price"));
//   const duration = formData.get("duration").slice(0, 100);
//   const minAge = Number(formData.get("minAge"));
//   const destinations = formData.get("destinations").slice(0, 100);
//   const description = formData.get("description").slice(0, 1000);
//   const group_size = formData.get("group_size");
//   const tags = formData.get("tags")?.split(",");
//   const image = formData.get("image");
//   const bannerImage = formData.get("bannerImage");
//   const existingImage = formData.get("existingImage");
//   const existingBannerImage = formData.get("existingBannerImage");
//   const activityId = Number(formData.get("activityId"));

//   const isNewImage = image && image.size > 0 && image.name !== "undefined";
//   const isNewBanner =
//     bannerImage && bannerImage.size > 0 && bannerImage.name !== "undefined";

//   const imageName = isNewImage
//     ? existingImage?.split("/").pop() || `${Math.random()}-${image.name}`
//     : existingImage;

//   const bannerImageName = isNewBanner
//     ? existingBannerImage?.split("/").pop() ||
//       `${Math.random()}-${bannerImage.name}`
//     : existingBannerImage;

//   const imagePath = isNewImage
//     ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/activity-images/${imageName}`
//     : existingImage;

//   const bannerImagePath = isNewBanner
//     ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/activity-images/${bannerImageName}`
//     : existingBannerImage;

//   if (
//     !duration ||
//     !description ||
//     !destinations ||
//     !tags ||
//     !price ||
//     !name ||
//     !image ||
//     !bannerImage
//   )
//     throw new Error("Please fill required fields");

//   if (isNewImage || isNewBanner) {
//     if (!ALLOWED_TYPES.includes(image.type)) {
//       throw new Error("Image: Only JPG, PNG, and WEBP files are allowed");
//     }
//     if (image.size > MAX_FILE_SIZE) {
//       throw new Error("Image file size must be less than 1MB");
//     }
//   }

//   if (isNewBanner) {
//     if (!ALLOWED_TYPES.includes(bannerImage.type)) {
//       throw new Error(
//         "Banner Image: Only JPG, PNG, and WEBP files are allowed",
//       );
//     }
//     if (bannerImage.size > MAX_FILE_SIZE) {
//       throw new Error("Banner image size must be less than 1MB");
//     }
//   }

//   const updateActivity = {
//     name,
//     price,
//     duration,
//     minAge,
//     destinations,
//     description,
//     group_size,
//     tags,
//     image: imagePath,
//     bannerImage: bannerImagePath,
//   };

//   const { error } = await supabase
//     .from("activities")
//     .update(updateActivity)
//     .eq("id", activityId)
//     .single();

//   if (error) {
//     console.log(error);
//     throw new Error("Error while updating Activity.😒");
//   }

//   if (isNewImage) {
//     const { error: imageUploadError } = await supabase.storage
//       .from("activity-images")
//       .upload(imageName, image, { upsert: true });

//     if (imageUploadError) {
//       console.log(imageUploadError);
//       throw new Error("Failed to update activity image. Please try again.");
//     }
//   }

//   if (isNewBanner) {
//     const { error: bannerUploadError } = await supabase.storage
//       .from("activity-images")
//       .upload(bannerImageName, bannerImage, { upsert: true });

//     if (bannerUploadError) {
//       throw new Error("Failed to update banner image. Please try again.");
//     }
//   }

//   revalidatePath(`/dashboard/edit-activity/${activityId}`);
//   revalidatePath("/dashboard/activities");

//   redirect("/dashboard/activities");
// }
export async function editActivityAction(formData) {
  // allow only admin to edit activity
  const session = await auth();
  if (!session || session?.user?.role !== "admin")
    throw new Error("You are not allowed to perform this action");

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
    throw new Error("Please fill required fields");

  if (
    isValidImage &&
    (!ALLOWED_TYPES.includes(image.type) || image.size > MAX_FILE_SIZE)
  ) {
    throw new Error("Main image must be JPG, PNG or WEBP and less than 1MB");
  }

  if (
    isValidBanner &&
    (!ALLOWED_TYPES.includes(bannerImage.type) ||
      bannerImage.size > MAX_FILE_SIZE)
  ) {
    throw new Error("Banner image must be JPG, PNG or WEBP and less than 1MB");
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
    throw new Error("Error while updating Activity.");
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
  const activity = await getActivity(activityId);
  const imageUrl = activity?.image;
  const bannerImageUrl = activity?.bannerImage;

  // function to extract image path

  const imagePath = extractImagePath(imageUrl)?.replace(/^\/+/, "");
  const bannerImagePath = extractImagePath(bannerImageUrl)?.replace(/^\/+/, "");

  const session = await auth();
  if (!session || session?.user?.role !== "admin")
    throw new Error("You are not allowed to perform this action");

  // 1. Delete image from bucket
  const { error: imageError } = await supabase.storage
    .from("activity-images")
    .remove([imagePath, bannerImagePath]);

  if (imageError)
    throw new Error("Some internal error occurs while deleteing an activity");

  // 2 delete activity
  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", activityId);

  if (error) throw new Error("Unable to delete activity. Please try again!");

  revalidatePath("/dashboard/activities");
}

export async function deleteUserAction(userId) {
  // check if user is login and user is admin
  const session = await auth();
  if (!session || session?.user?.role !== "admin")
    throw new Error("You are not allowed to perform this action");

  // Get all bookings of the user
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
      throw new Error("Failed to delete attendee data.");
    }

    // 3. Delete bookings
    const { error: bookingDeleteError } = await supabase
      .from("booking")
      .delete()
      .in("id", bookingIds);

    if (bookingDeleteError) {
      throw new Error("Failed to delete booking data.");
    }
  }
  // delete normal user from custom user table
  const { error: customUserError } = await supabaseAdmin
    .from("users")
    .delete()
    .eq("id", userId);
  if (customUserError) {
    console.log(customUserError.message);
    throw new Error("Unexpected Error has occurred.");
  }
  // Delete built in user table user
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.log(error.message);
    throw new Error("Unexpected Error has occurred.");
  }
  revalidatePath("/dashboard/users");
}

export async function createUserByAdmin(formData) {
  const session = await auth();
  if (!session || session?.user?.role !== "admin")
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
        // avatar: 'https://example.com/avatar.png'
      },
    });

  if (authError) {
    console.error("Error creating auth user:", authError.message);
    throw new Error(authError.message);
  }

  const userId = authData.user.id;
  const userData = { id: userId, fullName: name, role: role, email };
  // Step 2: Profile create
  const { error: userError } = await supabase.from("users").insert([userData]);

  if (userError) {
    console.error("Error creating profile:", userError.message);
    throw new Error(userError.message);
  }

  // return authData.user;
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}
export async function updateBookingPaymentStatus(updateBookingData, formData) {
  // Check if user is logged in and is an admin
  const session = await auth();
  if (!session || session?.user?.role !== "admin")
    throw new Error("You are not allowed to perform this action");

  // Get data from form
  const paymentStatus = formData.get("paymentStatus");
  const bookingId = formData.get("bookingId");

  if (paymentStatus === "null" || paymentStatus === "")
    throw new Error("Please select a valid option.");

  // If status is 'completed', update attendee table
  if (paymentStatus === "completed") {
    const { error: attendeeError } = await supabase
      .from("attendee")
      .update({ status: "paid" })
      .eq("bookingID", bookingId);

    if (attendeeError)
      throw new Error(
        "The attendee could not be found. They may have been removed or do not exist.",
      );
  }

  // Conditionally prepare booking update payload
  const bookingUpdatePayload =
    paymentStatus === "cancelled"
      ? { paymentStatus, totalPrice: 0 }
      : { ...updateBookingData, paymentStatus };

  // Update booking table
  const { error } = await supabase
    .from("booking")
    .update(bookingUpdatePayload)
    .eq("id", bookingId);

  if (error) throw new Error("Unable to update booking. Please try again.");

  revalidatePath(`/dashboard/bookings/${bookingId}`);
}
