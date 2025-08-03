import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { email, amount, activities, bookingId } = await req.json();

    // 🔹 1️⃣ Create Stripe Checkout Session for Organizer Payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      metadata: {
        bookingId,
      },
      line_items: [
        {
          price_data: {
            currency: "aed",
            product_data: {
              name:
                Array.isArray(activities) &&
                `Organizer Payment for ${activities.map((n) => n?.name).join(", ")}`,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      // success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success?email=${email}`,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/complete-booking`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking-failed`,
    });

    return NextResponse.json({ success: true, paymentLink: session.url });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
