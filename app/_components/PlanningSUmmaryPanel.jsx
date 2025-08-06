import Image from "next/image";
import React from "react";
import { usePartyBuilder } from "../_context/PartyBuilderProvider";
import { formatDateTime } from "../_lib/helpers";

export default function PlanningSUmmaryPanel({ selectedActivities }) {
  const { startDate, endDate, attendees, includeTransport, transportHours } =
    usePartyBuilder();

  const filledAttendees = attendees.filter(
    (a) => a.name.trim() !== "" || a.email.trim() !== "",
  );
  return (
    <div className="sticky top-20">
      {selectedActivities?.length > 0 ? (
        <div className="no-scrollbar space-y-8 px-4 py-6">
          <h2 className="mb-4 text-2xl font-bold text-matalicGold">Summary</h2>

          {/* Selected Activities */}

          <ul className="space-y-4">
            {selectedActivities?.map((activity) => (
              <li key={activity.id} className="flex items-start gap-3">
                <Image
                  src={activity.bannerImage}
                  alt={activity.name}
                  width={100}
                  height={100}
                  className="w-[100px] rounded-md border border-neutral-600 object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{activity.name}</p>
                  <p className="text-xs text-gray-400">
                    Price: ${activity.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Attendees */}
          <div className="mb-4">
            <h3 className="font-semibold">Attendees</h3>
            <p className="text-sm text-gray-300">
              {filledAttendees.length} total
            </p>
          </div>

          {/* Transport */}
          {includeTransport && (
            <div className="mb-4">
              <h3 className="font-semibold">Transport</h3>
              <p className="text-sm text-gray-300">
                Included for {transportHours} hours
              </p>
            </div>
          )}

          {/* Date Range */}
          <div className="mb-4">
            <h3 className="font-semibold">Dates</h3>
            <p className="text-sm text-gray-300">
              {formatDateTime(startDate)} - {formatDateTime(endDate)}
            </p>
          </div>

          {/* Total Price */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold">Per Person Price</h3>
            <p className="text-lg font-bold">
              $
              {selectedActivities
                ?.map((a) => a.price)
                .reduce((a, b) => a + b, 0) * attendees.length}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-fit w-full flex-col items-center justify-center gap-4 px-6 py-12 text-center text-sm text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m2 6H7a2 2 0 01-2-2V7a2 2 0 012-2h2l1-2h4l1 2h2a2 2 0 012 2v10a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-base font-medium text-white">
            No activities selected yet
          </p>
          <p className="max-w-sm text-xs text-gray-400">
            Select at least one activity from the list to see your party summary
            here.
          </p>
        </div>
      )}
    </div>
  );
}
