// new code
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ✅ apne actual paths lagao
import { addBooking } from "../_lib/data-services"; // <-- make sure this exists
import { addAttendees } from "../_lib/attendeeApi";

export default function CompleteBooking() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processBooking = async () => {
      const toastId = toast.loading("Processing...");
      try {
        // 1) URL se Stripe session_id lo
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get("session_id");
        if (!sessionId) {
          toast.error("Missing payment session.", { id: toastId });
          router.push("/");
          return;
        }

        // 2) Server par payment verify karo
        const vRes = await fetch(
          `/api/verify-payment?session_id=${encodeURIComponent(sessionId)}`,
        );
        const { paid } = await vRes.json();
        if (!paid) {
          toast.error("Payment not verified.", { id: toastId });
          router.push("/");
          return;
        }

        // 3) LocalStorage se booking data lo
        const raw = localStorage.getItem("bookingData");
        if (!raw) {
          toast.error("Missing booking details.", { id: toastId });
          router.push("/");
          return;
        }
        const bookingData = JSON.parse(raw);

        const {
          attendees = [],
          totalPrice,
          activities,
          bookingDate,
          end_date,
          destinations,
          packages,
          paidAmount,
          userId,
          booking_notes,
          phone,
          whatsApp,
          isOrganizerAttending,
          organizerName,
          organizerEmail,
          includeGroom,
          groomDetails,
        } = bookingData;

        if (!Array.isArray(attendees) || attendees.length === 0) {
          toast.error("No attendees found for booking.", { id: toastId });
          router.push("/");
          return;
        }

        // 4) Pehle DB me booking create karo (AB payment verified hai)
        const sanitizedBooking = {
          totalPrice,
          activities,
          bookingDate,
          end_date,
          destinations,
          packages,
          paidAmount,
          userId,
          booking_notes,
          phone,
          whatsApp,
          paymentSessionId: sessionId,
          isOrganizerAttending,
          groomDetails,
        };

        const { CurBooking, error } = await addBooking(sanitizedBooking);
        if (error || !CurBooking?.id) {
          toast.error("Unexpected error while adding booking.", {
            id: toastId,
          });
          router.push("/");
          return;
        }

        const bookingId = CurBooking.id;

        // 5) Ab attendee payment links banao (bookingId ke saath)
        // const splitAmount = Math.round(
        //   (Number(totalPrice || 0) * 0.85) / attendees.length,
        // );

        // get totall attendees
        const totalParticipants =
          attendees?.length +
          (isOrganizerAttending ? 1 : 0) +
          (includeGroom ? 1 : 0);

        // check if totalParticipants is 0
        if (totalParticipants === 0) {
          toast.error("No participants found for booking.", { id: toastId });
          router.push("/");
          return;
        }

        const splitAmount = Math.round(Number(totalPrice) / totalParticipants);

        let allEmails = attendees?.map((a) => a.email);
        if (isOrganizerAttending) allEmails.push(organizerEmail);
        if (includeGroom) allEmails.push(groomDetails.email);

        const res = await fetch("/api/create-payment-links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // emails: allEmails.map((e) => e),
            participants: [
              ...(attendees.length > 0 &&
                attendees?.map((a) => ({
                  email: a.email,
                  amount: splitAmount,
                }))),
              ...(isOrganizerAttending
                ? [
                    {
                      email: organizerEmail,
                      amount: splitAmount - bookingData.paidAmount,
                    },
                  ]
                : []),
              ...(includeGroom
                ? [{ email: groomDetails.email, amount: splitAmount }]
                : []),
            ],
            activities,
            bookingId, // ✅ ab defined hai
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

        // 6) Attendees payload tayyar karo
        const expiryIso = new Date(
          Date.now() + 12 * 24 * 60 * 60 * 1000,
        ).toISOString(); // 12 days
        const attendeesData = attendees.map(({ email, name }) => {
          const paymentLink =
            data.paymentLinks?.find((link) => link.email === email)?.link || "";

          return {
            bookingID: bookingId,
            email,
            name,
            amountPaid: splitAmount,
            status: "unpaid",
            paymentLink,
            expires_at: expiryIso,
          };
        });

        // ✅ Organizer attending case
        if (isOrganizerAttending) {
          attendeesData.push({
            bookingID: bookingId,
            email: organizerEmail,
            name: organizerName,
            amountPaid: splitAmount - bookingData.paidAmount, // deposit adjust
            status: "partially-paid",
            paymentLink: "", // deposit already paid
            expires_at: expiryIso,
          });
        }

        // ✅ Groom included case
        if (includeGroom) {
          attendeesData.push({
            bookingID: bookingId,
            email: groomDetails.email, // placeholder email
            name: groomDetails.name,
            amountPaid: splitAmount,
            status: "unpaid",
            paymentLink: "",
            expires_at: expiryIso,
          });
        }

        // 7) Attendees ko DB me save karo
        const { error: attendeeErrors } = await addAttendees(attendeesData);
        if (attendeeErrors) {
          toast.error("Unexpected error while adding attendees.", {
            id: toastId,
          });
          router.push("/");
          return;
        }

        // 8) Cleanup + redirect
        localStorage.removeItem("bookingData");
        localStorage.removeItem("bookingInProgress");

        toast.success("Booking complete! Payment links sent to attendees.", {
          id: toastId,
        });
        router.push(`/account/bookings/${bookingId}`);
      } catch (err) {
        console.error(err);
        toast.error("Opps! Something went wrong on the server", {
          id: toastId,
        });
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    processBooking();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Booking Processing...</p>
      </div>
    );
  }

  // Optional final state (agar loading false ho jaye aur redirect ho chuka ho)
  return null;
}
