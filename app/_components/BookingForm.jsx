"use client";
import { useState } from "react";
import { addBooking } from "../_lib/data-services";
import { addAttendees } from "../_lib/attendeeApi";
import { useRouter } from "next/navigation";
import LoggedInMessage from "../_components/LoggedInMeesage";
import XMarkIcon from "../svgIcons/XMarkIcon";

export default function BookingPage({ id, price, activityName }) {
  const router = useRouter();
  const [emails, setEmails] = useState([""]);
  const [user] = useState(true);
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);

  // add email
  const addEmail = () => {
    setEmails([...emails, ""]);
  };

  // delete email
  const removeEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
  };
  const updateEmail = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  // ✅ Always include organizer email
  const allEmails = [...emails, organizerEmail];
  const splitAmount = Math.round(price / allEmails.length);

  // const handleBooking = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     if (!emails || !organizerEmail) return;
  //     // Combine Emails (Organizer + Attendees)
  //     const allEmails = [...emails, organizerEmail];

  //     // ✅ 2. Check for Duplicate Emails
  //     const uniqueEmails = new Set(allEmails); // Set stores only unique values
  //     if (uniqueEmails.size !== allEmails.length) {
  //       alert("❌ Duplicate emails are not allowed!");
  //       setLoading(false);
  //       return;
  //     }
  //     // ✅ 1. Generate Payment Links from Stripe
  //     const res = await fetch("/api/create-payment-links", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         emails: allEmails,
  //         totalPrice: price,
  //         activityName,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (!data.success) {
  //       alert("Error generating payment links");
  //       return;
  //     }

  //     // ✅ 2. Create Booking Entry
  //     const booking = await addBooking({
  //       activityID: id,
  //       totalPrice: price,
  //       attendeeEmails: allEmails,
  //       organizerEmail,
  //       destination,
  //       activityName,
  //       bookingDate,
  //     });

  //     // ✅ 3. Map Correct Payment Links to Each Attendee
  //     const attendeesData = allEmails.map((email) => {
  //       const paymentLink =
  //         data.paymentLinks.find((link) => link.email === email)?.link || "";
  //       return {
  //         bookingID: booking.id,
  //         email,
  //         amountPaid: splitAmount,
  //         status: "unpaid",
  //         paymentLink, // ✅ Store actual Stripe link
  //         expires_at: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // ✅ 12 days expiry
  //       };
  //     });

  //     // ✅ 4. Insert Attendees with Payment Links
  //     await addAttendees(attendeesData);

  //     // ✅ 5. Show Links in UI
  //     setLinks(data.paymentLinks);

  //     alert("Booking added successfully ✅");
  //     router.push(`/bookings/${booking.id}`);
  //   } catch (error) {
  //     console.error("❌ Error:", error);
  //     alert("Error generating payment links");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!emails || !organizerEmail) return;

      // Combine Organizer Email + Attendees
      const allEmails = [...emails, organizerEmail];

      // ✅ Check for Duplicate Emails
      const uniqueEmails = new Set(allEmails);
      if (uniqueEmails.size !== allEmails.length) {
        alert("❌ Duplicate emails are not allowed!");
        setLoading(false);
        return;
      }

      // ✅ Save Booking Data to LocalStorage (Before Payment)
      localStorage.setItem(
        "bookingData",
        JSON.stringify({
          activityID: id,
          totalPrice: price,
          attendeeEmails: allEmails,
          organizerEmail,
          activityName,
          bookingDate,
        }),
      );

      // ✅ Calculate Organizer's 15% Payment
      const organizerAmount = Math.round(price * 0.15);

      // ✅ Request Organizer Payment Link
      const organizerPaymentRes = await fetch("/api/create-organizer-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: organizerEmail,
          amount: organizerAmount,
          activityName,
        }),
      });

      const organizerPaymentData = await organizerPaymentRes.json();

      if (!organizerPaymentData.success) {
        alert("Error generating organizer payment link.");
        setLoading(false);
        return;
      }

      // ✅ Redirect Organizer to Stripe Checkout for Payment
      window.location.href = organizerPaymentData.paymentLink;
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <LoggedInMessage />;
  return (
    <div className="w-full space-y-6 px-3 py-8 text-neutral-200 shadow-xl">
      <h1 className="text-2xl font-semibold">Stag Activity Booking</h1>

      <p className="text-xl font-medium">Price: ${price}</p>
      <form
        onSubmit={handleBooking}
        className="flex flex-col items-start gap-6"
      >
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium capitalize">
            Organizer Email:
          </span>
          <input
            type="email"
            value={organizerEmail}
            placeholder="organizer@email.com"
            onChange={(e) => setOrganizerEmail(e.target.value)}
            className="h-12 rounded-md bg-tertiary px-2 text-sm placeholder:text-sm focus:outline-blue-600"
            autoComplete="on"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium capitalize">Select Date:</span>
          <input
            type="date"
            value={bookingDate}
            placeholder="yyyy-MM-DD"
            onChange={(e) => setBookingDate(e.target.value)}
            className="h-12 rounded-md bg-tertiary px-2 text-sm placeholder:text-sm focus:outline-blue-600"
            required
          />
        </label>

        {emails.map((email, index) => (
          <label key={index} className="flex flex-col gap-2">
            <span className="text-sm font-medium capitalize">
              Attendee {index + 1} Email:
            </span>
            <div className="flex items-center gap-3">
              <input
                type="email"
                placeholder={`Enter Attendee ${index + 1} email`}
                value={email}
                onChange={(e) => updateEmail(index, e.target.value)}
                className="h-10 rounded-md bg-tertiary px-2 text-[14px] placeholder:text-sm focus:outline-blue-600"
                required
              />
              <button
                onClick={() => removeEmail(index)}
                type="button"
                className="flex size-6 items-center justify-center rounded-md bg-gradient-to-b from-red-800 to-red-500 text-sm font-medium capitalize text-red-100 hover:bg-gradient-to-t"
              >
                <XMarkIcon />
              </button>
            </div>
          </label>
        ))}

        <div className="flex flex-col items-start gap-3">
          <button
            className="rounded bg-gradient-to-br from-emerald-800 to-green-500 px-4 py-2.5 font-semibold text-white shadow-shadowOne duration-300 hover:scale-95 hover:bg-gradient-to-tr disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-500 disabled:hover:scale-100"
            type="submit"
            disabled={loading || !organizerEmail}
          >
            {loading ? "Processing..." : "Pay 15% to Confirm Booking"}
          </button>
          <button
            className="-order-1 inline-block rounded bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 px-4 py-2.5 text-sm font-semibold capitalize text-white hover:bg-gradient-to-tr"
            onClick={addEmail}
            type="button"
          >
            + Add Attendee
          </button>
        </div>
      </form>

      {/* {links.length > 0 && (
        <div className="space-y-4">
          <h2 className="bg-gradient-to-b from-green-400 via-green-500 to-green-950 bg-clip-text text-2xl font-semibold text-transparent">
            Payment Links:
          </h2>
          <ul className="w-full space-y-2">
            {links.map(({ email, link }, i) => (
              <li
                key={i}
                className="flex w-80 flex-col items-start gap-2 overflow-hidden text-ellipsis rounded-md bg-green-100 px-4 py-4 text-green-900"
              >
                <p className="text-sm font-medium">{email}</p>

                <Link
                  href={link}
                  className="flex items-center gap-2 rounded-md border-2 border-green-900 bg-green-900 px-4 py-1.5 text-sm font-semibold capitalize text-green-50 duration-300 hover:bg-transparent hover:text-green-900"
                >
                  <span>pay now</span>
                  <span>
                    <CurrencyDollarIcon width={15} />
                  </span>
                  
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}
