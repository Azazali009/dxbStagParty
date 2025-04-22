import { supabase } from "./supabase";
export async function addAttendees(attendeeData) {
  const { data: curAttendees, error } = await supabase
    .from("attendee")
    .insert(attendeeData)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Error while adding attendees");
  }
  return { curAttendees, error };
}
export async function getAttendees(id) {
  const { data, error } = await supabase
    .from("attendee")
    .select("*")
    .eq("bookingID", id);
  if (error) {
    console.log(error);
    throw new Error("Error while getting attendees. Please try again later!");
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
export async function updateAttendeeStatus(email, amount) {
  console.log(email, amount);
  // const { data, error } = await supabase
  //   .from("attendee")
  //   .update({ status: "paid" })
  //   .eq("email", email)
  //   .select("bookingID");

  // if (error) {
  //   console.error("❌ Error updating attendee status:", error);
  //   throw new Error("Error while updating attendee status");
  // }

  const bookingID = data[0]?.bookingID;
  if (!bookingID) return;

  // Fetch current paidAmount
  const { data: bookingData, error: fetchError } = await supabase
    .from("booking")
    .select("paidAmount")
    .eq("id", bookingID)
    .single();

  if (fetchError) {
    console.error("❌ Error fetching booking:", fetchError);
    throw new Error("Error while fetching booking");
  }
  const currentPaid = bookingData?.paidAmount || 0;
  const updatedPaidAmount = Number(currentPaid + amount);
  console.log(updatedPaidAmount);
  // Step 3: Update booking paidAmount
  // const { error: updateError } = await supabase
  //   .from("booking")
  //   .update({ paidAmount: updatedPaidAmount })
  //   .eq("id", bookingID);

  // if (updateError) {
  //   console.error("❌ Error updating booking paidAmount:", updateError);
  //   throw new Error("Error while updating paid amount");
  // }
  // // 🔄 Step 4: Check if All Attendees Have Paid
  // await checkAndUpdateBookingStatus(bookingID);
}

// ✅ Function to Extend Expiry Date by 24 Hours
export async function extendAttendeeExpiry(attendeeID) {
  if (!attendeeID) {
    throw new Error("Missing attendee ID");
  }

  // ✅ Fetch current expiry date
  const { data: attendee, error } = await supabase
    .from("attendee")
    .select("expires_at,has_extended")
    .eq("id", attendeeID)
    .single();

  if (error || !attendee) {
    throw new Error("Attendee not found");
  }

  // ✅ If attendee has already extended, prevent further extension
  if (attendee.has_extended) {
    throw new Error("You have already extended your payment link once!");
  }

  const currentExpiry = new Date(attendee.expires_at);
  const now = new Date();

  // ✅ Ensure the current expiry has not passed
  if (currentExpiry < now) {
    throw new Error("Payment link has already expired!");
  }

  // ✅ Extend expiry by 24 hours
  const newExpiry = new Date(currentExpiry.getTime() + 24 * 60 * 60 * 1000);

  // ✅ Update expiry date in Supabase
  const { error: updateError } = await supabase
    .from("attendee")
    .update({ expires_at: newExpiry, has_extended: true })
    .eq("id", attendeeID);

  if (updateError) {
    console.error("Error:", updateError);
    throw new Error("Failed to update expiry");
  }

  return newExpiry;
}
