import { notFound } from "next/navigation";
import { supabase } from "./supabase";
import { createClient } from "../_utils/supabase/client";
import { getCategoryByName } from "./categoryApi";

// export async function createActivity(newActivity) {
//   const imageName = `card-image-${Math.random()}-${newActivity?.image?.name}`;
//   const bannerImageName = `banner-image-${Math.random()}-${newActivity?.bannerImage?.name}`;

//   const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/activity-images/${imageName}`;
//   const bannerImagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/activity-images/${bannerImageName}`;

//   const { data, error } = await supabase
//     .from("activities")
//     .insert([
//       {
//         ...newActivity,
//         image: imagePath,
//         bannerImage: bannerImagePath,
//       },
//     ])
//     .select()
//     .single();

//   if (error) {
//     console.log(error);
//     return { error: "Error while creating Activity.😒" };
//   }

//   const { error: imageUploadError } = await supabase.storage
//     .from("activity-images")
//     .upload(imageName, newActivity?.image);

//   if (imageUploadError) {
//     console.log(imageUploadError);
//     await supabase.from("activities").delete().eq("id", data.id);
//     return {
//       error: "Activity image could not be uploaded. Activity was deleted.",
//     };
//   }

//   const { error: bannerUploadError } = await supabase.storage
//     .from("activity-images")
//     .upload(bannerImageName, newActivity?.bannerImage);

//   if (bannerUploadError) {
//     console.log(bannerUploadError);
//     await supabase.from("activities").delete().eq("id", data.id);
//     return {
//       error: "Banner image could not be uploaded. Activity was deleted.",
//     };
//   }

//   return data;
// }

// export async function editActivity(editActivity, id) {
//   const hasImagePath = editActivity?.image?.startsWith(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//   );

//   const imageName = `${Math.random()}-${editActivity?.image?.name}`;
//   const imagePath = hasImagePath
//     ? editActivity.image
//     : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/activity-images/${imageName}`;

//   const { data, error } = await supabase
//     .from("activities")
//     .update({ ...editActivity, image: imagePath })
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.log(error);
//     throw new Error("Error while updating Activity.😒");
//   }
//   if (hasImagePath) return data;
//   const { error: storageError } = await supabase.storage
//     .from("activity-images")
//     .upload(imageName, editActivity?.image);

//   if (storageError) {
//     console.log(error);
//     throw new Error(
//       "Activity image could not updated due to some internal error. Please try again",
//     );
//   }
//   return data;
// }

export async function getActivities() {
  let { data, error } = await supabase
    .from("activities")
    .select(`*,supplier(name),category(id,name)`);

  if (error) {
    console.log(error);
    return { error: "Error while getting Activities.😒" };
  }
  return data;
}
export async function getActivitiesByCategory(categoryName) {
  const category = await getCategoryByName(categoryName);

  let { data, error } = await supabase
    .from("activities")
    .select(`*,category(image,name)`)
    .eq("categoryId", category.id);

  if (error) {
    console.log(error);
    return { error: "Error while getting Activities.😒" };
  }
  return data;
}
export async function getActivity(id) {
  let { data, error } = await supabase
    .from("activities")
    .select(`*,supplier(id,name),category(id,name)`)
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Error While Getting Activity.😒");
  }
  return data;
}

export async function addBooking(booking) {
  const { data: CurBooking, error } = await supabase
    .from("booking")
    .insert([booking])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Error while booking activity. Please try again.🤔");
  }
  return { CurBooking, error };
}

export async function getBookings() {
  const supabaseServer = createClient();
  let { data: booking, error } = await supabaseServer.from("booking").select(`*
      ,users (
      fullName,
      email
    )`);

  if (error) {
    console.log(error);
    return { error: "Error while getting bookings." };
  }
  return booking;
}
export async function getPendingBookings() {
  let { data: booking, error } = await supabase
    .from("booking")
    .select("*")
    .eq("paymentStatus", "pending");

  if (error) {
    console.log(error);
    throw new Error("Error while getting pending bookings.");
  }
  return booking;
}
export async function getBooking(id) {
  let { data: booking, error } = await supabase
    .from("booking")
    .select(
      `*,users (
      fullName,
      email
    )`,
    )
    .eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Error while getting booking.");
  }
  return booking[0];
}
export async function getBookingByUserId(userId) {
  let { data: bookings, error } = await supabase
    .from("booking")
    .select("*")
    .eq("userId", userId);
  if (error) {
    console.log(error);
    throw new Error("Error while getting your bookings.");
  }
  return bookings;
}

export async function getRecentBookings() {
  const { data, error } = await supabase
    .from("booking")
    .select(
      `*, users (
        email
      )`,
    )
    .order("paymentStatus", { ascending: false }) // status alphabetically: pending → confirmed → etc.
    .order("created_at", { ascending: false }) // latest first within each status
    .limit(10);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getRecentTopActivities() {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
