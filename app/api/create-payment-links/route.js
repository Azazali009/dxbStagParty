import { NextResponse } from "next/server";
import { stripe } from "../../_lib/stripe";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { emails, totalPrice, activityName } = await req.json();

    if (!emails || emails.length === 0) {
      return NextResponse.json({ error: "Emails required" }, { status: 400 });
    }

    const perPersonAmount = Math.round(totalPrice / emails.length);
    let paymentLinks = [];

    for (const email of emails) {
      // 🔹 Create Stripe Payment Link
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: activityName },
              unit_amount: perPersonAmount * 100, // Amount in cents
            },
            quantity: 1,
          },
        ],
        success_url: `http://localhost:3000/user`,
        cancel_url: `https://yourdomain.com/cancel`,
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
    html: `<h1>Stag Activity Payment</h1>
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
