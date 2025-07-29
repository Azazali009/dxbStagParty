"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AttendeeEmailsBookingDetails from "../_components/AttendeeEmailsBookingDetails";
import BookingDetails from "../_components/BookingDetails";
import BookingFormPagination from "../_components/BookingFormPagination";
import LoggedInMessage from "../_components/LoggedInMeesage";
import OrganiserBookingDetails from "../_components/OrganiserBookingDetails";
import { useBooking } from "../_context/bookingProvider";
import Button from "./Button";
import Summary from "./Summary";
export default function BookingForm({
  id,
  price,
  activityName,
  destinations,
  groupSize = "",
  user,
  duration,
}) {
  const {
    selectedActivities,
    selectedPackages,
    loading,
    bookingDate,
    endDate,
    setMinDate,
    setLoading,
    bookingNotes,
    phone,
    whatsApp,
    attendees,
    setAttendees,
  } = useBooking();
  const [totalPrice, setTotalPrice] = useState(price);

  const [minGroup, maxGroup] = groupSize && groupSize?.split("-")?.map(Number);

  const searchParams = useSearchParams();
  // Get current step from URL (default to 1)
  const currentStep = parseInt(searchParams.get("step") || 1);

  // effect to disbale previous dates
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setMinDate(today);
  }, [setMinDate]);

  // effect for adding all prices
  useEffect(() => {
    const getSelectedActivities = selectedActivities.reduce((acc, curr) => {
      return acc + parseInt(curr.price);
    }, 0);
    const getSelectedPackages = selectedPackages.reduce((acc, curr) => {
      return acc + parseInt(curr.price);
    }, 0);
    let totalPrice =
      parseInt(price || 0) +
      parseInt(getSelectedActivities || 0) +
      parseInt(getSelectedPackages || 0);

    setTotalPrice(totalPrice);
  }, [price, selectedActivities, selectedPackages]);

  const handleBooking = async (e) => {
    const toastId = toast.loading("Processing...");
    e.preventDefault();
    setLoading(true);

    try {
      // Error Toasts
      if (!bookingDate || isNaN(bookingDate.getTime())) {
        return toast.error("Please select a valid booking date.", {
          id: toastId,
        });
      }

      if (!endDate || isNaN(endDate.getTime())) {
        return toast.error("Please select a valid end date.", { id: toastId });
      }

      if (!attendees) {
        return toast.error("Please add required attendees.", {
          id: toastId,
        });
      }

      const allEmails = [...attendees.map((a) => a.email), user.email];
      const allPhones = [...attendees.map((a) => a.phone), phone]; // phone = organizer phone

      // ✅ Check for Duplicate Emails
      const uniqueEmails = new Set(allEmails);
      if (uniqueEmails.size !== allEmails.length) {
        toast.error(
          "Duplicate attendees are not allowed. Please enter a unique email.",
          { id: toastId },
        );
        setLoading(false);
        return;
      }

      // ✅ Calculate Organizer's 15% Payment
      const organizerAmount = Math.round(totalPrice * 0.15);

      // ✅ Save Booking Data to LocalStorage (Before Payment)
      localStorage.setItem(
        "bookingData",
        JSON.stringify({
          activities: [
            {
              name: activityName,
              price: price,
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
          attendees: [
            ...attendees.map((a) => ({
              email: a.email,
              phone: a.phone,
            })),
            {
              email: user.email,
              phone: phone,
            },
          ],
          organizerEmail: user.email,
          activityName,
          bookingDate: bookingDate.toISOString(),
          end_date: endDate.toISOString(),
          paidAmount: organizerAmount,
          destinations,
          booking_notes: bookingNotes,
          phone,
          whatsApp,
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
    <div className="relative w-full space-y-6 px-3 py-6 text-neutral-200">
      <h1 className="text-center text-base font-bold text-secondary md:text-3xl dark:text-neutral-100">
        Level up your party with
        <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-secondary">
          DXB Stag
        </span>{" "}
        Party
      </h1>

      <form
        onSubmit={handleBooking}
        className="grid grid-cols-1 items-center gap-x-10 gap-y-6 p-4 md:grid-cols-2"
      >
        {currentStep === 1 && (
          <OrganiserBookingDetails
            email={user.email}
            name={user?.user_metadata?.full_name}
          />
        )}
        {currentStep === 2 && <BookingDetails duration={duration} id={id} />}
        {currentStep === 3 && (
          <AttendeeEmailsBookingDetails
            attendees={attendees}
            setAttendees={setAttendees}
            minGroup={minGroup}
            maxGroup={maxGroup}
          />
        )}
        {currentStep === 4 && (
          <div
            style={{ gridColumn: "1/-1" }}
            className="flex flex-col gap-4 justify-self-center"
          >
            <Button variation="gold" type="submit" disable={loading}>
              {loading ? "Processing..." : "Pay & Confirm"}{" "}
            </Button>
            <small>
              You’ll only pay 15% now to confirm your spot. The rest comes
              later.
            </small>
          </div>
        )}
        <BookingFormPagination currentStep={currentStep} />
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
