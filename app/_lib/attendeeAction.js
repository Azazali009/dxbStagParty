"use server";

import { revalidatePath } from "next/cache";
import { updateAttendeeResendIncrement } from "./attendeeApi";
import { getCurrentUser } from "./getCurrentUser";

export async function updateAttendeeResendIncrementAction(attendee, bookingID) {
  const user = await getCurrentUser();
  if (!user || user?.user_metadata?.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/resend-payment-link`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: attendee.email,
        amount: attendee.amountPaid,
        remainingAttempts: attendee.resendIncrement,
        bookingId: bookingID,
      }),
    },
  );

  const data = await res.json();
  const attendeeRes = await updateAttendeeResendIncrement(attendee.id);
  console.log(attendeeRes);
  if (data.status === "failed" || attendeeRes?.error)
    return {
      error:
        "Opps! Something went wrong on the server while sending payment link",
    };

  revalidatePath(`/bookings/${bookingID}`);
}

export async function addAttendeesAction(data, formatDate) {
  console.log(data);
}
