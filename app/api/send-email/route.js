// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// // ✅ Create Transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // ✅ API Route to Send Email
// export async function POST(req) {
//   try {
//     const { toEmail, subject, message } = await req.json();

//     if (!toEmail || !subject || !message) {
//       return NextResponse.json(
//         { error: "Missing email parameters" },
//         { status: 400 },
//       );
//     }

//     const mailOptions = {
//       from: `"Booking System" <${process.env.EMAIL_USER}>`,
//       to: toEmail,
//       subject: subject,
//       html: message,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`📧 Confirmation email sent to ${toEmail}`);

//     return NextResponse.json({
//       success: true,
//       message: "Email sent successfully!",
//     });
//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//     return NextResponse.json(
//       { error: "Failed to send email" },
//       { status: 500 },
//     );
//   }
// }

// after edge function add this new code
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ✅ simple protection – must match the secret your Edge Function uses
const INTERNAL_SECRET = process.env.CRON_SECRET; // set on Vercel

// ✅ Create Transporter (Gmail requires App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g. yourname@gmail.com
    pass: process.env.EMAIL_PASS, // Google App Password (not your normal password)
  },
});

export async function POST(req) {
  // --- 1) Gate this route (optional but recommended)
  try {
    if (INTERNAL_SECRET) {
      const headerKey = req.headers.get("x-cron-secret");
      const url = new URL(req.url);
      const queryKey = url.searchParams.get("key"); // fallback if you ever need it
      if (headerKey !== INTERNAL_SECRET && queryKey !== INTERNAL_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // --- 2) Parse and validate payload
    const { toEmail, subject, message, cc, bcc } = await req.json();

    if (!toEmail || !subject || !message) {
      return NextResponse.json(
        { error: "Missing email parameters" },
        { status: 400 },
      );
    }

    // Optional: support comma-separated recipients
    const to = Array.isArray(toEmail) ? toEmail.join(",") : String(toEmail);

    // --- 3) Send email
    const mailOptions = {
      from: `"DXB Stag Parties" <${process.env.EMAIL_USER}>`,
      to,
      cc: cc || undefined,
      bcc: bcc || undefined,
      subject,
      html: message,
      // text fallback (optional)
      // text: message.replace(/<[^>]+>/g, " ")
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
