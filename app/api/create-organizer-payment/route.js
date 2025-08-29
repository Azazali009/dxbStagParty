import { extractImages, sanitizeImages } from "../../_lib/helpers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { email, amount, activities, bookingId } = await req.json();

    const images = sanitizeImages(extractImages(activities));
    // 🔹 1️⃣ Create Stripe Checkout Session for Organizer Payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "aed",
            product_data: {
              name:
                Array.isArray(activities) &&
                `Organizer Payment for ${activities.map((n) => n?.name).join(", ")}`,
              images: images,
            },

            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/complete-booking?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking-failed`,
    });

    return NextResponse.json({ success: true, paymentLink: session.url });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
