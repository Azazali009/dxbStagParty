import React, { useEffect, useState } from "react";
import { formatToAED } from "../_lib/helpers";
import { useBooking } from "../_context/bookingProvider";
import { set } from "date-fns";

export default function Summary({ totalPrice, user }) {
  const {
    selectedActivities,
    selectedPackages,
    attendees,
    setAttendees,
    includeGroom,
    isOrganizerAttending,
    groomDetails,
  } = useBooking();

  const validAttendees = attendees.filter(
    (a) => a?.email?.trim() || a?.name?.trim(),
  );

  // ✅ Derived attendees for display only
  const displayAttendees = [
    ...validAttendees,
    ...(isOrganizerAttending && user?.email
      ? [{ email: user.email, name: user.user_metadata.full_name }]
      : []),
    ...(includeGroom && groomDetails
      ? [{ email: groomDetails.email, name: groomDetails.name }]
      : []),
  ];
  return (
    <div
      draggable
      className="no-scrollbar space-y-6 overflow-y-auto bg-neutral-900 p-8 text-matalicGold"
    >
      {selectedActivities.map((activity) => {
        return (
          <div
            key={activity.value}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="">{activity.label}:</span>{" "}
            <span className="">{formatToAED(activity.price)}</span>
          </div>
        );
      })}
      {/* {price && (
        <div className="flex items-center justify-between text-sm">
          <span className="">{activityName}:</span>{" "}
          <span className="">{formatToAED(price)}</span>
        </div>
      )} */}
      {selectedPackages.map((pack) => {
        return (
          <div
            key={pack.value}
            className="flex items-center justify-between text-sm"
          >
            <span className="">{pack.label}:</span>{" "}
            <span className="">{formatToAED(pack.price)}</span>
          </div>
        );
      })}
      <div className="flex items-center justify-between">
        <span>Total Attendees: </span>
        <span>{displayAttendees?.length}</span>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-neutral-800 pt-5">
        <h2 className="text-lg font-semibold">Total Price:</h2>
        <p className="text-lg font-semibold">{formatToAED(totalPrice)}</p>
      </div>
      {/* <p className="text-sm font-light ">
          (Includes 15% Organizer Fee){" "}
        </p> */}
    </div>
  );
}
