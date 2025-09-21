import { createClient } from "../_utils/supabase/client";
import { getCategoryByName } from "./categoryApi";

const supabase = createClient();

export async function deleteBooking(bookingId) {
  const { error } = await supabase.from("booking").delete().eq("id", bookingId);

  if (error) return { error: "Booking could not deleted" };
}

export async function getActivities() {
  let { data, error } = await supabase
    .from("activities")
    .select(`*,supplier(fullName),category(id,name,slug)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return { error: "Error while getting Activities.😒" };
  }
  const safeData = Array.isArray(data) ? data : [];
  return safeData;
}
export async function getActivitiesByCategory(categoryName) {
  const category = await getCategoryByName(categoryName);
  // agar category load hi nahi hua
  if (!category || category?.error) {
    return [];
  }
  let { data, error } = await supabase
    .from("activities")
    .select(`*,category(image,name)`)
    .eq("categoryId", category.id);

  if (error) {
    console.log(error);
    return { error: "Error while getting Activities.😒" };
  }

  const safeData = Array.isArray(data) ? data : [];
  return safeData;
}
export async function getActivity(slug) {
  let { data, error } = await supabase
    .from("activities")
    .select(`*,supplier(id,fullName),category(id,name)`)
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    return { error: "Error While Getting Activity.😒" };
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
    return { error: "Error while booking activity. Please try again.🤔" };
  }
  return { CurBooking, error };
}

export async function getBookings() {
  const supabaseServer = createClient();
  let { data: bookings, error } = await supabaseServer.from("booking").select(`*
      ,users (
      fullName,
      email
    )`);

  if (error) {
    console.log(error);
    return { error: "Error while getting bookings." };
  }
  const safeData = Array.isArray(bookings) ? bookings : [];
  return safeData;
}
export async function getPendingBookings() {
  let { data: bookings, error } = await supabase
    .from("booking")
    .select("*")
    .eq("paymentStatus", "pending");

  if (error) {
    console.log(error);
    throw new Error("Error while getting pending bookings.");
  }
  const safeData = Array.isArray(bookings) ? bookings : [];
  return safeData;
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
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
    return { error: "Error while getting booking." };
  }
  return booking;
}
export async function getBookingByUserId(userId) {
  let { data: bookings, error } = await supabase
    .from("booking")
    .select("*")
    .eq("userId", userId);

  if (error) {
    console.log(error);
    return { error: "Error while getting your bookings." };
  }

  const safeData = Array.isArray(bookings) ? bookings : [];
  return safeData;
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
    return { error: error.message };
  }

  const safeData = Array.isArray(data) ? data : [];
  return safeData;
}

export async function getRecentTopActivities() {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return { error: error.message };
  }

  const safeData = Array.isArray(data) ? data : [];
  return safeData;
}
