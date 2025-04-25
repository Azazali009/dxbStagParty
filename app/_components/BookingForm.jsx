"use client";
import { act, useEffect, useState } from "react";
import LoggedInMessage from "../_components/LoggedInMeesage";
import SelectActivities from "../_components/SelectActivities";
import SelectPackages from "../_components/SelectPackages";
import toast from "react-hot-toast";
import FormRow from "./FormRow";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";
import Button from "./Button";
import Summary from "./Summary";
import { formatToAED } from "../_lib/helpers";

export default function BookingPage({
  id,
  price,
  activityName,
  destinations,
  session,
}) {
  const [emails, setEmails] = useState([""]);
  const [user] = useState(true);
  const [organizerEmail, setOrganizerEmail] = useState(session.user.email);
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
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

  // effect to disbale previous dates
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setMinDate(today);
  }, []);
  // effect for adding all prices
  useEffect(() => {
    const getSelectedActivities = selectedActivities.reduce((acc, curr) => {
      return acc + parseInt(curr.price);
    }, 0);
    const getSelectedPackages = selectedPackages.reduce((acc, curr) => {
      return acc + parseInt(curr.price);
    }, 0);
    let totalPrice =
      parseInt(price) +
      parseInt(getSelectedActivities) +
      parseInt(getSelectedPackages);

    setTotalPrice(totalPrice);
  }, [price, selectedActivities, selectedPackages]);

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
        toast.error("Duplicate emails are not allowed!", { id: toastId });
        setLoading(false);
        return;
      }

      // ✅ Calculate Organizer's 15% Payment
      const organizerAmount = Math.round(totalPrice * 0.15);
      // ✅ Save Booking Data to LocalStorage (Before Payment)
      localStorage.setItem(
        "bookingData",
        JSON.stringify({
          // activityID: id,
          activities: [
            {
              name: activityName,
              price: price, // make sure you have this value in scope
            },
            ...selectedActivities.map((act) => ({
              name: act.label,
              price: act.price,
            })),
          ],
          packages: selectedPackages.map((pkg) => ({
            name: pkg.label,
            price: pkg.price,
          })),
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
      localStorage.setItem("bookingInProgress", "true");
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Error processing payment.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <LoggedInMessage />;

  return (
    <div className="relative w-full px-3 pt-20 text-neutral-200">
      <h1 className="mb-8 text-center text-base font-bold text-secondary md:text-3xl dark:text-neutral-100">
        Level up your party with{" "}
        <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-secondary">
          DXB Stag
        </span>{" "}
        Activities
      </h1>

      <form
        onSubmit={handleBooking}
        className="mt-20 grid grid-cols-1 gap-x-10 gap-y-6 p-4 md:grid-cols-2"
      >
        <FormRow label={"Organizer Email:"}>
          <input
            type="email"
            disabled
            value={organizerEmail}
            placeholder="organizer@email.com"
            onChange={(e) => setOrganizerEmail(e.target.value)}
            className="h-10 rounded-md border-none bg-primary px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600 disabled:opacity-50"
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
            className="h-10 rounded-md border-none bg-primary px-2 text-xs placeholder:text-sm focus:outline-none focus:outline-blue-600"
            required
          />
        </FormRow>

        <AttendeeEmailInputFields
          emails={emails}
          updateEmail={updateEmail}
          removeEmail={removeEmail}
        />

        <SelectActivities
          selectedActivities={selectedActivities}
          setSelectedActivities={setSelectedActivities}
          activityId={id}
        />
        <SelectPackages
          selectedPackages={selectedPackages}
          setSelectedPackages={setSelectedPackages}
        />
        <div className="sticky bottom-0 flex w-full items-center gap-3 justify-self-center bg-neutral-950 p-4 [grid-column:1/-1]">
          <div>
            <Button
              variation="gold"
              type="submit"
              disable={loading || !organizerEmail || !bookingDate}
            >
              {loading ? "Processing..." : "Pay 15% to Confirm Booking"}{" "}
            </Button>
          </div>
          <button
            className="inline-block rounded-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 px-4 py-2.5 font-medium capitalize text-white hover:bg-gradient-to-tr"
            onClick={addEmail}
            type="button"
          >
            + Add Attendee
          </button>
        </div>
      </form>
      {/* summary */}
      <Summary
        selectedActivities={selectedActivities}
        selectedPackages={selectedPackages}
        price={price}
        activityName={activityName}
        totalPrice={totalPrice}
      />
    </div>
  );
}
