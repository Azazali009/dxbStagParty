"use client";
import { useState, useTransition } from "react";
import AttendeeCard from "../_components/AttendeeCard";
import XMarkIcon from "../svgIcons/XMarkIcon";
import Button from "./Button";
import FormRow from "./FormRow";
import { addAttendeesAction } from "../_lib/attendeeAction";

export default function AttendeeDetail({
  attendee,
  bookingPaymentStatus,
  bookingID,
}) {
  const [isPending, startTransition] = useTransition();
  const [attendees, setAttendees] = useState([]);

  const addAttendee = () => {
    setAttendees((prev) => [...prev, { email: "", phone: "" }]);
  };

  const removeAttendee = (index) => {
    setAttendees((prev) => prev.filter((_, i) => i !== index));
  };

  const updateAttendee = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };
  function handleSubmit() {
    startTransition(async () => {
      await addAttendeesActionWithData();
    });
  }
  const addAttendeesActionWithData = addAttendeesAction.bind(null, {
    attendees,
    bookingID,
  });
  if (!attendee.length || !attendee)
    return <p className="text-center text-red-500">No attendess found</p>;
  return (
    <div className="space-y-4">
      <h2 className="!mt-12 text-xl font-semibold">All Attendee&apos;s</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {attendee.map(
          (attendee) => (
            // attendee.email !== booking.organizerEmail && (
            <AttendeeCard
              key={attendee.id}
              attendee={attendee}
              bookingID={bookingID}
              bookingPaymentStatus={bookingPaymentStatus}
            />
          ),
          // ),
        )}
        {/* <div className="space-y-4">
          {attendees.map((curAttendee, index) => (
            <FormRow
              label={`Attendee ${attendee.length + index + 1}`}
              key={index}
            >
              <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={curAttendee.email}
                  onChange={(e) =>
                    updateAttendee(index, "email", e.target.value)
                  }
                  className={
                    "h-10 rounded border border-gray-700 bg-transparent px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600"
                  }
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={curAttendee.phone}
                  onChange={(e) =>
                    updateAttendee(index, "phone", e.target.value)
                  }
                  className={
                    "h-10 rounded border border-gray-700 bg-transparent px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600"
                  }
                  required
                />

                <button
                  onClick={() => removeAttendee(index)}
                  type="button"
                  className="absolute -right-2 -top-2 z-10 flex size-6 items-center justify-center rounded-md bg-gradient-to-b from-red-800 to-red-500 text-sm font-medium capitalize text-red-100 hover:bg-gradient-to-t"
                >
                  <XMarkIcon />
                </button>
              </div>
            </FormRow>
          ))}

          <button
            onClick={addAttendee}
            type="button"
            className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
          >
            + Add Attendee
          </button>
        </div>
        <form action={handleSubmit}>
          <Button className="border-2 border-matalicGold bg-transparent text-matalicGold hover:scale-95">
            update attendees
          </Button>
        </form> */}
      </div>
    </div>
  );
}
