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

        const {
          attendeeEmails,
          totalPrice,
          activities,
          activityName,
          bookingDate,
          end_date,
          destinations,
          packages,
          paidAmount,
          userId,
          booking_notes,
        } = bookingData;

        // ✅ Generate Attendee Payment Links
        const res = await fetch("/api/create-payment-links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emails: attendeeEmails,
            totalPrice,
            activities: bookingData.activities,
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

        // ✅ Prepare booking object with cleaned attendee list
        const sanitizedBooking = {
          totalPrice,
          activities,
          activityName,
          bookingDate,
          end_date,
          destinations,
          packages,
          paidAmount,
          userId,
          booking_notes,
        };

        const { CurBooking, error } = await addBooking(sanitizedBooking);
        if (error) {
          toast.error("Unexpected error while adding booking.", {
            id: toastId,
          });
          router.push("/");
          return;
        }
        const attendeesData = attendeeEmails.map((email) => {
          const paymentLink =
            data.paymentLinks.find((link) => link.email === email)?.link || "";
          return {
            bookingID: CurBooking.id,
            email,
            amountPaid: splitAmount,
            status: "unpaid",
            paymentLink, // ✅ Store actual Stripe link
            expires_at: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // ✅ 12 days expiry
          };
        });
        // ✅ Add Attendees to Database
        const { error: attendeeErrors } = await addAttendees(attendeesData);
        if (attendeeErrors) {
          toast.error("Unexpected error while adding attendees.", {
            id: toastId,
          });
          router.push("/");
          return;
        }
        toast.success(
          "Booking complete! Attendees will receive payment links through emails 📩.",
          { id: toastId },
        );
        router.push(`/account/bookings/${CurBooking.id}`); // Redirect to bookings page
        localStorage.removeItem("bookingData");
      } catch (error) {
        console.log(error);
        toast.error("Opps! Something went wrong on the server", {
          id: toastId,
        });
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
