import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ✅ Create Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ API Route to Send Email
export async function POST(req) {
  try {
    const { toEmail, subject, message } = await req.json();

    if (!toEmail || !subject || !message) {
      return NextResponse.json(
        { error: "Missing email parameters" },
        { status: 400 },
      );
    }

    const mailOptions = {
      from: `"Booking System" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Confirmation email sent to ${toEmail}`);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
