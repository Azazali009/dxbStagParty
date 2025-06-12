import React from "react";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";

export default function AttendeeEmailsBookingDetails({
  emails,
  setEmails,
  minGroup,
  maxGroup,
}) {
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
  const addEmail = () => {
    setEmails([...emails, ""]);
  };
  return (
    <>
      <AttendeeEmailInputFields
        emails={emails}
        updateEmail={updateEmail}
        removeEmail={removeEmail}
        minGroup={minGroup}
      />
      {emails.length < maxGroup && (
        <button
          className="inline-block w-fit rounded bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-700 px-4 py-1.5 text-sm capitalize text-white hover:bg-gradient-to-tr"
          onClick={addEmail}
          type="button"
        >
          + Add Attendee
        </button>
      )}
    </>
  );
}
