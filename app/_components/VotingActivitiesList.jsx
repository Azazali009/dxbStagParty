"use client";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { addBooking } from "../_lib/data-services";

export default function VotingActivitiesList({
  isClosed,
  decorated,
  totalVotes,
  attendees,
  activities,
  user,
  session,
}) {
  // handle booking function
  const handleBooking = async (id) => {
    const toastId = toast.loading("Processing...");

    try {
      // fetch current selected activity
      const selectedActivity = activities.find(
        (activity) => activity.id === id,
      );
      // get all prices from activities and add them
      const prices = selectedActivity.price;

      const totalPrice = prices * (attendees?.length || 1);

      // Calculate Organizer's 15% Payment
      const organizerAmount = Math.round(totalPrice * 0.15);

      localStorage.setItem(
        "bookingData",
        JSON.stringify({
          // bookingId,
          activities: [selectedActivity],
          userId: user.id,
          totalPrice,
          attendees: [
            ...attendees.map((a) => ({
              email: a.email,
              name: a.name,
            })),
            {
              email: user?.email,
              name: user?.user_metadata?.full_name,
            },
          ],
          organizerEmail: user.email,
          bookingDate: session?.created_at,
          end_date: session.end_time,
          paidAmount: organizerAmount,
        }),
      );

      // ✅ Request Organizer Payment Link
      const organizerPaymentRes = await fetch("/api/create-organizer-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          amount: organizerAmount,
          activities: [selectedActivity],
          // bookingId,
        }),
      });

      const organizerPaymentData = await organizerPaymentRes.json();

      if (!organizerPaymentData.success) {
        toast.error("Error generating organizer payment link.", {
          id: toastId,
        });
        return;
      }

      //   // ✅ Redirect Organizer to Stripe Checkout for Payment
      window.location.href = organizerPaymentData.paymentLink;
      localStorage.setItem("bookingInProgress", "true");
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Error processing payment.", { id: toastId });
    }
  };

  return (
    <div className="rounded-lg border border-neutral-700 p-6 shadow-lg">
      <h2 className="text-xl font-medium">Activities</h2>

      <ul className="mt-4 space-y-4">
        {decorated.map((activity) => (
          <li
            key={activity.id}
            className={`flex w-full gap-4 rounded-md border p-4 shadow-2xl ${
              activity.isWinner ? "border-matalicGold" : "border-neutral-700"
            }`}
          >
            <div className="relative h-[84px] w-[112px] shrink-0 overflow-hidden rounded-md bg-neutral-800">
              <Image
                src={activity?.bannerImage || "/default-activity-image.jpg"}
                alt={activity.name || `Activity #${activity.id}`}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h4
                  className={`font-semibold ${
                    activity.isWinner ? "text-matalicGold" : "text-neutral-600"
                  }`}
                >
                  {activity.name}
                </h4>
                <p
                  className={`text-sm ${activity?.isWinner ? "text-softGold" : "text-neutral-600"}`}
                >
                  Votes: <b>{activity.voteCount}</b>
                </p>
              </div>

              {isClosed && activity.isWinner && (
                <Button
                  onClick={() => handleBooking(activity.id)}
                  className="!w-fit py-2.5 sm:text-sm"
                  variation="gold"
                >
                  Proceed to Booking
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {isClosed && totalVotes === 0 && (
        <p className="mt-4 text-sm text-gray-400">No votes were cast.</p>
      )}
    </div>
  );
}
