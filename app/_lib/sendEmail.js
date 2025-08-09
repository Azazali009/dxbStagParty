export async function sendEmail({ toEmail, subject, message }) {
  try {
    const emailApiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`;

    const res = await fetch(emailApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toEmail, subject, message }),
    });

    if (!res.ok) {
      console.error("Email sending failed:", await res.text());
      return { error: "Failed to send email" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: "Unexpected error occurred while sending email" };
  }
}
