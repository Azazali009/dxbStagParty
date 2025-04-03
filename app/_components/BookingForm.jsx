"use client";
import { useEffect, useState } from "react";
import LoggedInMessage from "../_components/LoggedInMeesage";
import SelectActivities from "../_components/SelectActivities";
import SelectPackages from "../_components/SelectPackages";
import XMarkIcon from "../svgIcons/XMarkIcon";
import toast from "react-hot-toast";
import FormRow from "./FormRow";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";

export default function BookingPage({ id, price, activityName, destinations }) {
  const [emails, setEmails] = useState([""]);
  const [user] = useState(true);
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [activityPrice, setActivityPrice] = useState(0);
  const [packagePrice, setPackagePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(price);
  const [minDate, setMinDate] = useState("");
  // const [links, setLinks] = useState([]);
  // add email function
  const addEmail = () => {
    setEmails([...emails, ""]);
  };

  // delete email function
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

  // effect to disbale previous dates
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setMinDate(today);
  }, []);
  // effect for adding all prices
  useEffect(() => {
    let totalPrice =
      parseInt(price) + parseInt(activityPrice) + parseInt(packagePrice);

    setTotalPrice(totalPrice);
  }, [price, activityPrice, packagePrice]);

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
    const toastId = toast.loading("Processing...");
    e.preventDefault();
    setLoading(true);

    try {
      if (!emails || !organizerEmail || !bookingDate) return;

      // Combine Organizer Email + Attendees
      const allEmails = [...emails, organizerEmail];

      // ✅ Check for Duplicate Emails
      const uniqueEmails = new Set(allEmails);
      if (uniqueEmails.size !== allEmails.length) {
        toast.error("Duplicate emails are not allowed!");
        setLoading(false);
        return;
      }

      // ✅ Calculate Organizer's 15% Payment
      const organizerAmount = Math.round(price * 0.15);
      // ✅ Save Booking Data to LocalStorage (Before Payment)
      localStorage.setItem(
        "bookingData",
        JSON.stringify({
          activityID: id,
          totalPrice,
          attendeeEmails: allEmails,
          organizerEmail,
          activityName,
          bookingDate,
          paidAmount: organizerAmount,
          destinations,
        }),
      );

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
        toast.error("Error generating organizer payment link.", {
          id: toastId,
        });
        setLoading(false);
        return;
      }

      // ✅ Redirect Organizer to Stripe Checkout for Payment
      window.location.href = organizerPaymentData.paymentLink;
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Error processing payment.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <LoggedInMessage />;

  return (
    <div className="mb-8 w-full px-3 py-8 text-neutral-200 shadow-xl">
      <h1 className="mb-8 text-center text-base font-bold text-secondary md:text-3xl dark:text-neutral-100">
        Level up your party with{" "}
        <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-secondary">
          DXB Stag
        </span>{" "}
        Activities
      </h1>

      {/* <p className="text-base font-medium text-white sm:text-xl">
        Price: ${price}
      </p> */}
      <form
        onSubmit={handleBooking}
        className="mt-20 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2"
      >
        <FormRow label={"Organizer Email:"}>
          <input
            type="email"
            value={organizerEmail}
            placeholder="organizer@email.com"
            onChange={(e) => setOrganizerEmail(e.target.value)}
            className="h-12 rounded-md bg-tertiary px-2 text-sm placeholder:text-sm focus:outline-blue-600"
            autoComplete="on"
            required
          />
        </FormRow>

        <FormRow label={"Select Date:"}>
          <input
            type="date"
            min={minDate}
            value={bookingDate}
            placeholder="yyyy-MM-DD"
            onChange={(e) => setBookingDate(e.target.value)}
            className="h-12 rounded-md bg-tertiary px-2 text-sm placeholder:text-sm focus:outline-blue-600"
            required
          />
        </FormRow>

        <AttendeeEmailInputFields
          emails={emails}
          updateEmail={updateEmail}
          removeEmail={removeEmail}
        />

        <SelectActivities
          activityPrice={activityPrice}
          setActivityPrice={setActivityPrice}
        />
        <SelectPackages
          packagePrice={packagePrice}
          setPackagePrice={setPackagePrice}
        />
        <div className="flex items-start gap-3 [grid-column:1/-1]">
          <button
            className="rounded bg-gradient-to-br from-emerald-800 to-green-500 px-4 py-2.5 font-semibold text-white duration-300 hover:scale-95 hover:bg-gradient-to-tr disabled:cursor-not-allowed disabled:from-neutral-700 disabled:to-neutral-700 disabled:opacity-50 disabled:hover:scale-100"
            type="submit"
            disabled={loading || !organizerEmail || !bookingDate}
          >
            {loading ? "Processing..." : "Pay 15% to Confirm Booking"}{" "}
            {totalPrice}
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
