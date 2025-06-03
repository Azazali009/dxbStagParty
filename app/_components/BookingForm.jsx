"use client";
import { useEffect, useRef, useState } from "react";
import LoggedInMessage from "../_components/LoggedInMeesage";
import SelectActivities from "../_components/SelectActivities";
import SelectPackages from "../_components/SelectPackages";
import toast from "react-hot-toast";
import FormRow from "./FormRow";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";
import Button from "./Button";
import Summary from "./Summary";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";

export default function BookingForm({
  id,
  price,
  activityName,
  destinations,
  user,
}) {
  const inputRef = useRef(null);
  const [emails, setEmails] = useState([""]);

  // const [organizerEmail, setOrganizerEmail] = useState(session.user.email);
  // const [organizerName, setOrganizerName] = useState(session.user.name);
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [totalPrice, setTotalPrice] = useState(price);
  const [minDate, setMinDate] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");

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

  const handleBooking = async (e) => {
    const toastId = toast.loading("Processing...");
    e.preventDefault();
    setLoading(true);

    try {
      if (!emails || !bookingDate) return;

      // Combine Organizer Email + Attendees
      const allEmails = [...emails, user.email];

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
          userId: user.id,
          totalPrice,
          attendeeEmails: allEmails,
          organizerEmail: user.email,
          activityName,
          bookingDate,
          paidAmount: organizerAmount,
          destinations,
          booking_notes: bookingNotes,
        }),
      );

      // ✅ Request Organizer Payment Link
      const organizerPaymentRes = await fetch("/api/create-organizer-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
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
    <div className="relative w-full space-y-6 px-3 py-10 text-neutral-200">
      <h1 className="text-center text-base font-bold text-secondary md:text-3xl dark:text-neutral-100">
        Level up your party with
        <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-secondary">
          DXB Stag
        </span>{" "}
        Activities
      </h1>

      <form
        onSubmit={handleBooking}
        className="grid grid-cols-1 gap-x-10 gap-y-6 p-4 md:grid-cols-2"
      >
        <FormRow label={"Organizer Email:"}>
          <input
            type="email"
            disabled
            value={user.email}
            placeholder="organizer@email.com"
            // onChange={(e) => setOrganizerEmail(e.target.value)}
            className="h-10 rounded-md border-none bg-primary px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600 disabled:opacity-50"
            autoComplete="on"
            required
          />
        </FormRow>
        <FormRow label={"Organizer Name:"}>
          <input
            type="text"
            disabled
            value={user?.user_metadata?.full_name}
            placeholder="Organizer name"
            // onChange={(e) => setOrganizerName(e.target.value)}
            className="h-10 rounded-md border-none bg-primary px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600 disabled:opacity-50"
            autoComplete="on"
            required
          />
        </FormRow>

        <FormRow label={"Select Date:"}>
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="date"
              min={minDate}
              id="date"
              value={bookingDate}
              placeholder="yyyy-MM-DD"
              onChange={(e) => setBookingDate(e.target.value)}
              className="h-10 w-full rounded-md border-none bg-primary px-2 placeholder:text-sm focus:outline-none focus:outline-blue-600"
              required
            />
            <button
              type="button"
              onClick={() => inputRef.current.showPicker((show) => !show)}
              className="absolute right-2 top-1/2 block -translate-y-1/2 duration-300 active:scale-90"
            >
              <CalenderDaysIcon />
            </button>
          </div>
        </FormRow>
        <FormRow label={"Booking Notes:"}>
          <input
            type="text"
            id="booking_notes"
            value={bookingNotes}
            placeholder="important notes"
            onChange={(e) => setBookingNotes(e.target.value)}
            className="h-10 w-full rounded-md border-none bg-primary px-2 placeholder:text-sm focus:outline-none focus:outline-blue-600"
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
              disable={loading || !bookingDate}
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
