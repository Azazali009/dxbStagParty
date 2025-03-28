"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addBooking } from "../_lib/data-services";
import { addAttendees } from "../_lib/attendeeApi";
import toast from "react-hot-toast";

export default function CompleteBooking() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processBooking = async () => {
      const toastId = toast.loading("Processing...");
      try {
        // ✅ Retrieve Booking Data from LocalStorage
        const bookingData = JSON.parse(localStorage.getItem("bookingData"));

        if (!bookingData) {
          toast.error("Missing booking details. Unable to complete booking.", {
            id: toastId,
          });
          router.push("/");
          return;
        }

        const { attendeeEmails, totalPrice } = bookingData;

        // ✅ Insert Booking into Database
        const booking = await addBooking(bookingData);

        // ✅ Generate Attendee Payment Links
        const res = await fetch("/api/create-payment-links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emails: attendeeEmails,
            totalPrice,
            activityName: bookingData.activityName,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          toast.error("Error generating attendee payment links.", {
            id: toastId,
          });
          router.push("/");
          return;
        }

        // ✅ Calculate Payment for Each Attendee
        const splitAmount = Math.round(
          (totalPrice * 0.85) / attendeeEmails.length,
        );

        const attendeesData = attendeeEmails.map((email) => {
          const paymentLink =
            data.paymentLinks.find((link) => link.email === email)?.link || "";
          return {
            bookingID: booking.id,
            email,
            amountPaid: splitAmount,
            status: "unpaid",
            paymentLink, // ✅ Store actual Stripe link
            expires_at: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // ✅ 12 days expiry
          };
        });
        await addAttendees(attendeesData);
        toast.success(
          "Booking complete! Attendees will receive payment links through emails 📩.",
          { id: toastId },
        );
        router.push(`/bookings/${booking.id}`); // Redirect to bookings page
        localStorage.removeItem("bookingData");
      } catch (error) {
        toast.error("Unexpected error.", { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    processBooking();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg font-semibold">Finalizing Booking...</p>
    </div>
  );
}
