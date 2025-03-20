import { supabase } from "./supabase";
export async function addAttendees(attendeeData) {
  const { data, error } = await supabase
    .from("attendee")
    .insert(attendeeData)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Error while adding attendees");
  }
  return data;
}
export async function getAttendees(id) {
  const { data, error } = await supabase
    .from("attendee")
    .select("*")
    .eq("bookingID", id);
  if (error) {
    console.log(error);
    throw new Error("Error while getting. Please try again later!");
  }
  return data;
}

// ✅ 3️⃣ Check if All Attendees are Paid & Update `bookings`
export async function checkAndUpdateBookingStatus(bookingID) {
  // Fetch all attendees of this booking
  const { data: attendees, error: fetchError } = await supabase
    .from("attendee")
    .select("status")
    .eq("bookingID", bookingID);

  if (fetchError) {
    console.error("❌ Error fetching attendees:", fetchError);
    throw new Error("Error while fetching attendees");
  }

  // Check if all attendees are "paid"
  const allPaid = attendees.every((attendee) => attendee.status === "paid");

  // ✅ If all attendees are paid, update `bookings.payment_status` to "completed"
  if (allPaid) {
    const { data: booking, error: updateError } = await supabase
      .from("booking")
      .update({ paymentStatus: "completed" })
      .eq("id", bookingID)
      .select("organizerEmail");

    if (updateError) {
      console.error("❌ Error updating booking status:", updateError);
      throw new Error("Error while updating booking status");
    }
    const organizerEmail = booking[0]?.organizerEmail;

    if (organizerEmail) {
      // ✅ Send Confirmation Email to Organizer
      const emailApiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`;
      await fetch(emailApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: organizerEmail,
          subject: "Booking Payment Completed",
          message: `<div>
          <h1>🎉Congrats. You booking is paid by all your attendee's</h1>
          <p>🎉 All attendees have paid! Your booking #${bookingID} is now confirmed. Enjoy🏆</p>
          </div>`,
        }),
      });
    }
    console.log(
      `🎉 Booking ${bookingID} is now fully paid and marked as completed!`,
    );
  }
}
// ✅4️⃣  Update Payment Status of a Specific Attendee
export async function updateAttendeeStatus(email) {
  const { data, error } = await supabase
    .from("attendee")
    .update({ status: "paid" })
    .eq("email", email)
    .select("bookingID");

  if (error) {
    console.error("❌ Error updating attendee status:", error);
    throw new Error("Error while updating attendee status");
  }

  const bookingID = data[0]?.bookingID;
  if (!bookingID) return;

  // 🔄 Step 4: Check if All Attendees Have Paid
  await checkAndUpdateBookingStatus(bookingID);
}
