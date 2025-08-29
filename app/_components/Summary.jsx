import React, { useState } from "react";
import { formatToAED } from "../_lib/helpers";
import { useBooking } from "../_context/bookingProvider";

export default function Summary({ activityName, price, totalPrice }) {
  const { selectedActivities, selectedPackages, attendees } = useBooking();
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
        <span>{attendees?.length}</span>
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
