"use server";

import { revalidatePath } from "next/cache";
import { updateAttendeeResendIncrement } from "./attendeeApi";
import { getCurrentUser } from "./getCurrentUser";

export async function updateAttendeeResendIncrementAction(attendee, bookingID) {
  const user = await getCurrentUser();
  if (!user || user?.user_metadata?.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  const res = await fetch("http://localhost:3000/api/resend-payment-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: attendee.email,
      amount: attendee.amountPaid,
    }),
  });

  const data = await res.json();
  const attendeeRes = await updateAttendeeResendIncrement(attendee.id);
  if (data.status === "failed" || attendeeRes?.error)
    return {
      error:
        "Opps! Something went wrong on the server while sending payment link",
    };

  revalidatePath(`/bookings/${bookingID}`);
}
