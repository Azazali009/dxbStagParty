import React from "react";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";

export default function AttendeeEmailsBookingDetails({
  attendees,
  setAttendees,
  minGroup = 1,
  maxGroup = 10,
}) {
  const removeAttendee = (index) => {
    setAttendees((prev) => prev.filter((_, i) => i !== index));
  };

  const updateAttendee = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const addAttendee = () => {
    setAttendees((prev) => [...prev, { email: "", phone: "" }]);
  };

  return (
    <>
      <AttendeeEmailInputFields
        attendees={attendees}
        updateAttendee={updateAttendee}
        removeAttendee={removeAttendee}
        minGroup={minGroup}
      />
      {attendees.length < maxGroup && (
        <button
          className="inline-block w-fit rounded bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-700 px-4 py-1.5 text-sm capitalize text-white hover:bg-gradient-to-tr"
          onClick={addAttendee}
          type="button"
        >
          + Add Attendee
        </button>
      )}
    </>
  );
}
