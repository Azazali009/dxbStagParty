import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { email, amount, remainingAttempts, bookingId } = await req.json();

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
              name: `Payment for DXB Stag Activity`,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking-failed`,
    });
    const paymentLink = session.url;
    await sendEmail(email, paymentLink, remainingAttempts);
    return NextResponse.json({ status: "success", paymentLink });
  } catch (error) {
    return NextResponse.json({ status: "failed", error: error.message });
  }
}

// 📧 Function to Send Email
async function sendEmail(to, paymentLink, remainingAttempts) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Gmail Email
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Resend payment Link of activity",
    text: `Click the link to pay: ${paymentLink}`,
    html: `<h1>Stag Activity Payment</h1>
    <p>Be carefull you have ${remainingAttempts} attemps left</p>
      <p style="font-size:16px; font-weight:400;line-height:1.7;">Hi there! Below is your payment link. All other payment links have been sent to your friend emails. Please ensure timely payment to secure your booking.</p>
      <a style="background-image: linear-gradient(to right, #086647, #21bf5d);
         padding: 10px 24px;
         border-radius: 6px;
         font-weight: 700;
         text-transform: capitalize;
         width: fit-content;
         color:white;
         display:block;
         text-decoration:none;
         "
          href="${paymentLink}">Pay Now</a> `,
  };

  await transporter.sendMail(mailOptions);
}
