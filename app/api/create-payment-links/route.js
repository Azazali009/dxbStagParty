import { NextResponse } from "next/server";
import { stripe } from "../../_lib/stripe";
import nodemailer from "nodemailer";
import { extractImages, sanitizeImages } from "../../_lib/helpers";

export async function POST(req) {
  try {
    const {
      emails,
      participants = [],
      totalPrice,
      activities,
      bookingId,
    } = await req.json();

    const images = sanitizeImages(extractImages(activities));
    // if (!emails || emails.length === 0 || !totalPrice) {
    //   return NextResponse.json(
    //     { error: "Email and total price are required" },
    //     { status: 400 },
    //   );
    // }

    if (!participants.length) {
      return res
        .status(400)
        .json({ success: false, error: "No participants provided" });
    }

    // calculte price for each attendee and remove the 15% which is paid by the organizer
    // const perPersonAmount = Math.round((totalPrice * 0.85) / emails.length);
    let paymentLinks = [];

    for (const participant of participants) {
      const { email, amount } = participant;

      if (!email || !email.includes("@")) {
        console.warn("Skipping invalid participant:", participant);
        continue; // skip if email is invalid
      }
      // 🔹 Create Stripe Payment Link
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
                images: images,
              },
              unit_amount: Math.round(amount * 100), // Amount in cents
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking-failed`,
      });

      const paymentLink = session.url;
      paymentLinks.push({ email, link: paymentLink });

      // ✅ Send Email with Payment Link
      await sendEmail(email, paymentLink);
    }

    return NextResponse.json({ success: true, paymentLinks });
  } catch (error) {
    console.error("❌ Payment Link Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// 📧 Function to Send Email
async function sendEmail(to, paymentLink) {
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
    subject: "Your Payment Link for Stag Activity",
    text: `Click the link to pay: ${paymentLink}`,
    html: `
  <div style="background-color:#0B0E1C; color:#E0B15E; padding:30px; font-family:sans-serif; text-align:center;">
    <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="DXB Stag Parties Logo" style="width:120px; margin-bottom:20px;" />

    <h1 style="font-size:24px; margin-bottom:20px;">DXB Stag Activity Payment</h1>

    <p style="font-size:16px; font-weight:400; line-height:1.7; margin-bottom:30px;">
      Hi there! Below is your payment link. All other payment links have been sent to your friends' emails.<br/>
      Please ensure timely payment to secure your booking.
    </p>

    <!-- Golden Branded Pay Now Button -->
    <a href="${paymentLink}"
       style="display:inline-block; padding:10px 20px; background-color:#E0B15E; color:#0B0E1C; text-decoration:none; font-weight:bold; border-radius:6px; margin-bottom:16px;">
       Pay Now
    </a>

    <p style="margin-top:40px; font-size:12px; color:#aaa;">
      If you did not expect this email, you may safely ignore it.
    </p>
  </div>
`,
  };

  await transporter.sendMail(mailOptions);
}
