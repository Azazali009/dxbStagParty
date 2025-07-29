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
  const { data: attendees, error } = await supabase
    .from("attendee")
    .select(`*,booking(userId)`)
    .eq("bookingID", id);
  if (error) {
    console.log(error);
    throw new Error("Error while getting attendees. Please try again later!");
  }
  // get user ID
  const userId = attendees?.[0]?.booking?.userId;

  // fetch user
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("fullName")
    .eq("id", userId)
    .single();
  if (userError) {
    console.log(userError);
    throw new Error("Error while fetching user name");
  }
  return { attendees, user };
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

  // ✅ If all attendees are paid, update `paymentStatus` to "completed"
  if (allPaid) {
    const { data: booking, error: updateError } = await supabase
      .from("booking")
      .update({ paymentStatus: "completed" })
      .eq("id", bookingID).select(`*
      ,users (
      fullName,
      email
    )`);

    if (updateError) {
      console.error("❌ Error updating booking status:", updateError);
      return { error: "Error while updating booking status" };
    }
    const organizerEmail = booking[0]?.users.email;

    if (organizerEmail) {
      // ✅ Send Confirmation Email to Organizer
      const emailApiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`;
      await fetch(emailApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: organizerEmail,
          subject: "Booking Payment Completed",
          message: `
  <div style="background-color:#0B0E1C; color:#E0B15E; padding:30px; font-family:sans-serif; text-align:center;">
    <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="DXB Stag Parties Logo" style="width:120px; margin-bottom:20px;" />

    <h1 style="font-size:24px; margin-bottom:20px;">🎉 Congrats! Your Booking Is Fully Paid</h1>

    <p style="font-size:16px; margin-bottom:30px;">
      All attendees have paid! Your booking <strong>#${bookingID}</strong> is now confirmed.<br/>
      Get ready to party like never before 🏆
    </p>

    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/my-bookings"
       style="display:inline-block; padding:12px 24px; background-color:#E0B15E; color:#0B0E1C; text-decoration:none; font-weight:bold; border-radius:6px;">
       View Booking Details
    </a>

    <p style="margin-top:40px; font-size:12px; color:#aaa;">
      Need help? Contact our team anytime at support@dxbstagparties.com
    </p>
  </div>
`,
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
  const { data, error } = await supabase
    .from("attendee")
    .update({ status: "paid" })
    .eq("email", email)
    .select("bookingID")
    .single();

  if (error) {
    console.error("❌ Error updating attendee status:", error);
    return { error: "Error while updating attendee status" };
  }

  const bookingID = data?.bookingID;
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
  const currentPaid = bookingData?.paidAmount;
  const updatedPaidAmount = Number(currentPaid) + Number(amount);

  // Step 3: Update booking paidAmount
  const { error: updateError } = await supabase
    .from("booking")
    .update({ paidAmount: updatedPaidAmount })
    .eq("id", bookingID);

  if (updateError) {
    console.error("❌ Error updating booking paidAmount:", updateError);
    return { error: "Error while updating paid amount" };
  }
  // 🔄 Step 4: Check if All Attendees Have Paid
  await checkAndUpdateBookingStatus(bookingID);
}

// ✅ Function to Extend Expiry Date by 24 Hours
export async function extendAttendeeExpiry(attendeeID) {
  if (!attendeeID) {
    return { error: "Missing attendee ID" };
  }

  // ✅ Fetch current expiry date
  const { data: attendee, error } = await supabase
    .from("attendee")
    .select("expires_at,has_extended")
    .eq("id", attendeeID)
    .single();

  if (error || !attendee) {
    return { error: "Attendee not found" };
  }

  // ✅ If attendee has already extended, prevent further extension
  if (attendee.has_extended) {
    return { error: "You have already extended your payment link once!" };
  }

  const currentExpiry = new Date(attendee.expires_at);
  const now = new Date();

  // ✅ Ensure the current expiry has not passed
  if (currentExpiry < now) {
    throw new Error(
      "Payment link has already expired! Please try to sent fresh link.",
    );
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

export async function updateAttendeeResendIncrement(attendeeId) {
  // Get the current resendIncrement value first
  const { data, error } = await supabase
    .from("attendee")
    .select("resendIncrement")
    .eq("id", attendeeId)
    .single();

  if (error) {
    return { error: "Oops! Could not fetch attendee data." };
  }

  const currentValue = data.resendIncrement;

  if (currentValue <= 0) {
    return { error: "Maximum resend attempts reached." };
  }

  // Decrease the value by 1
  const { error: updateError } = await supabase
    .from("attendee")
    .update({ resendIncrement: currentValue - 1 })
    .eq("id", attendeeId);

  if (updateError) {
    return { error: "Oops! Something went wrong updating the resend counter." };
  }
}
