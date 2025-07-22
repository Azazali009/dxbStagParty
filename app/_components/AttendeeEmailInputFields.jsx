import React from "react";
import FormRow from "./FormRow";
import XMarkIcon from "../svgIcons/XMarkIcon";
import { cn } from "../_lib/utils";

export default function AttendeeInputFields({
  attendees,
  updateAttendee,
  removeAttendee,
  minGroup,
  inputClassName,
}) {
  return (
    <>
      {attendees.map((attendee, index) => (
        <FormRow label={`Attendee ${index + 1}`} key={index}>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              value={attendee.email}
              onChange={(e) => updateAttendee(index, "email", e.target.value)}
              className={cn(
                "block h-10 w-full rounded-md border-none bg-navyBlue px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600",
                inputClassName,
              )}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={attendee.phone}
              onChange={(e) => updateAttendee(index, "phone", e.target.value)}
              className={cn(
                "block h-10 w-full rounded-md border-none bg-navyBlue px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600",
                inputClassName,
              )}
              required
            />
            {attendees.length > minGroup && (
              <button
                onClick={() => removeAttendee(index)}
                type="button"
                className="flex size-6 items-center justify-center rounded-md bg-gradient-to-b from-red-800 to-red-500 text-sm font-medium capitalize text-red-100 hover:bg-gradient-to-t"
              >
                <XMarkIcon />
              </button>
            )}
          </div>
        </FormRow>
      ))}
    </>
  );
}
