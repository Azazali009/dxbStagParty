import { supabase } from "./supabase";

export async function createActivity(newActivity) {
  // https://dvuzbcalsepjpbwkypyz.supabase.co/storage/v1/object/public/activity-images//bf.jpg
  const imageName = `${Math.random()}-${newActivity?.image?.name}`;
  const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/activity-images/${imageName}`;
  const { data, error } = await supabase
    .from("activities")
    .insert([{ ...newActivity, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Error while creating Activity.😒");
  }

  const { error: storageError } = await supabase.storage
    .from("activity-images")
    .upload(imageName, newActivity?.image);
  if (storageError) {
    console.log(storageError);
    await supabase.from("activities").delete().eq("id", data.id);
    throw new Error(
      "Activity image could not uploaded and the activity was not created.",
    );
  }
  return data;
}

export async function getActivities() {
  let { data, error } = await supabase.from("activities").select("*");

  if (error) {
    console.log(error);
    throw new Error("Error while getting Activities.😒");
  }
  return data;
}
export async function getActivity(id) {
  let { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Error While Getting Activity.😒");
  }
  return data[0];
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
  let { data: booking, error } = await supabase.from("booking").select("*");
  // .select(
  //   "totalPrice,attendeeEmails,paymentStatus,organizerEmail,destination,activities(name,price)",
  // );
  if (error) {
    console.log(error);
    throw new Error("Error while getting bookings.");
  }
  return booking;
}
export async function getBooking(id) {
  let { data: booking, error } = await supabase
    .from("booking")
    .select("*")
    .eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Error while getting booking.");
  }
  return booking[0];
}
export async function getBookingByOrganizer(organizerEmail) {
  let { data: bookings, error } = await supabase
    .from("booking")
    .select("*")
    .eq("organizerEmail", organizerEmail);
  if (error) {
    console.log(error);
    throw new Error("Error while getting booking by organizer.");
  }
  return bookings;
}
