import React from "react";
import FormRow from "./FormRow";
import XMarkIcon from "../svgIcons/XMarkIcon";

export default function AttendeeEmailInputFields({
  emails,
  updateEmail,
  removeEmail,
}) {
  return (
    emails.length > 0 &&
    emails.map((email, index) => (
      <FormRow label={` Attendee ${index + 1} Email:`} key={index}>
        <div className="flex items-center gap-3">
          <input
            type="email"
            placeholder={`Enter Attendee ${index + 1} email`}
            value={email}
            autoComplete="email"
            onChange={(e) => updateEmail(index, e.target.value)}
            className="h-10 flex-1 rounded-md border-none bg-primary px-2 text-[14px] placeholder:text-sm focus:outline-none focus:outline-blue-600"
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
      </FormRow>
    ))
  );
}
