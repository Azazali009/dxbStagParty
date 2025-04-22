import { NextResponse } from "next/server";
import { stripe } from "../../_lib/stripe";
import { updateAttendeeStatus } from "../../_lib/attendeeApi"; // Update attendee in DB

export async function POST(req) {
  console.log("🚀 Webhook endpoint called");
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  try {
    // ✅ Verify Webhook Event from Stripe
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_email; // ✅ Get attendee's email
      const amount = session.amount_total / 100; // Amount in AED

      console.log(`✅ Payment received from: ${email}`);

      // ✅ Update Attendee Status in Supabase
      await updateAttendeeStatus(email, amount);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
  }
}
