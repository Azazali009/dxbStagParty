"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addBooking } from "../_lib/data-services";
import { addAttendees } from "../_lib/attendeeApi";

export default function CompleteBooking() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processBooking = async () => {
      try {
        // ✅ Retrieve Booking Data from LocalStorage
        const bookingData = JSON.parse(localStorage.getItem("bookingData"));

        if (!bookingData) {
          alert("❌ Missing booking details.");
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
          alert("❌ Error generating attendee payment links.");
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
        alert("✅ Booking complete! Attendees will receive payment links.");
        router.push(`/bookings/${booking.id}`); // Redirect to bookings page
      } catch (error) {
        alert("❌ Unexpected error.");
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

// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { addBooking, getBookingByOrganizer } from "../_lib/data-services"; // ✅ Fetch existing booking
// import { addAttendees } from "../_lib/attendeeApi";

// export default function CompleteBooking() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // ✅ Check if booking has already been processed
//     if (sessionStorage.getItem("bookingProcessed")) return;

//     const processBooking = async () => {
//       try {
//         // ✅ Retrieve Booking Data from LocalStorage
//         const bookingData = JSON.parse(localStorage.getItem("bookingData"));

//         if (!bookingData) {
//           alert("❌ Missing booking details.");
//           router.push("/");
//           return;
//         }

//         const { attendeeEmails, totalPrice, organizerEmail } = bookingData;

//         // ✅ Check if Booking Already Exists (Prevents Duplicate Insertion)
//         let booking = await getBookingByOrganizer(organizerEmail);
//         if (!booking) {
//           booking = await addBooking(bookingData);
//         }

//         // ✅ Generate Attendee Payment Links
//         const res = await fetch("/api/create-payment-links", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             emails: attendeeEmails,
//             totalPrice,
//             activityName: bookingData.activityName,
//           }),
//         });

//         const data = await res.json();
//         if (!data.success) {
//           alert("❌ Error generating attendee payment links.");
//           router.push("/");
//           return;
//         }

//         // ✅ Calculate Payment for Each Attendee
//         const splitAmount = Math.round(
//           (totalPrice * 0.85) / attendeeEmails.length,
//         );

//         // ✅ Map Attendees and Insert into Database (Prevent Duplicate Entries)
//         const attendeesData = attendeeEmails.map((email) => {
//           const paymentLink =
//             data.paymentLinks.find((link) => link.email === email)?.link || "";
//           return {
//             bookingID: booking.id,
//             email,
//             amountPaid: splitAmount,
//             status: "unpaid",
//             paymentLink,
//             expires_at: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // ✅ 12 days expiry
//           };
//         });

//         await addAttendees(attendeesData);

//         // ✅ Mark Booking as Processed (Prevents Double Execution)
//         sessionStorage.setItem("bookingProcessed", "true");
//         localStorage.removeItem("bookingData");
//         // ✅ Redirect to Bookings Page After Processing
//         alert("✅ Booking complete! Attendees will receive payment links.");
//         router.push(`/bookings/${booking.id}`);
//       } catch (error) {
//         alert("❌ Unexpected error.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     processBooking();
//   }, []); // ✅ No dependencies to prevent re-running

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <p className="text-lg font-semibold">Finalizing Booking...</p>
//     </div>
//   );
// }
