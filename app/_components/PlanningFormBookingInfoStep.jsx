import React, { useRef } from "react";
import FormRow from "./FormRow";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";
import { usePartyBuilder } from "../_context/PartyBuilderProvider";
import { useBooking } from "../_context/bookingProvider";

export default function PlanningFormBookingInfoStep() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    attendees,
    setAttendees,
    isAttendeeError,
  } = usePartyBuilder();
  const {
    isOrganizerAttending,
    setIsOrganizerAttending,
    includeGroom,
    setIncludeGroom,
    groomDetails,
    setGroomDetails,
  } = useBooking();
  const startDatepickerRef = useRef(null);
  const endDatepickerRef = useRef(null);

  //   add attendee function
  const addAttendee = () => {
    setAttendees((prev) => [...prev, { email: "", name: "" }]);
  };

  //   remove attendee function
  const removeAttendee = (index) => {
    setAttendees((prev) => prev.filter((_, i) => i !== index));
  };

  //   update attendee function
  const updateAttendee = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };
  return (
    <div className="space-y-6">
      <FormRow label={"Start Date & Time"}>
        <div className="relative w-full">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            placeholderText="Select a date and time"
            timeIntervals={30}
            dateFormat={"dd/MM/yyyy  hh:mm aa"}
            timeFormat="hh:mm aa"
            className="block !h-10 w-full rounded-md border border-gray-700 bg-transparent px-4 text-left font-semibold shadow-2xl focus:outline-none"
            calendarClassName="calender"
            minDate={new Date()}
            ref={startDatepickerRef}
            name="test"
          />
          <button
            type="button"
            onClick={() => startDatepickerRef.current.setOpen((prev) => !prev)}
            className={"absolute right-2 top-1/2 block -translate-y-1/2"}
          >
            <CalenderDaysIcon />
          </button>
        </div>
      </FormRow>

      <FormRow label={"End Date & Time"}>
        <div className="relative w-full">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            placeholderText="Select a date and time"
            timeIntervals={30}
            dateFormat={"dd/MM/yyyy  hh:mm aa"}
            timeFormat="hh:mm aa"
            className="block !h-10 w-full rounded-md border border-gray-700 bg-transparent px-4 text-left font-semibold shadow-2xl focus:outline-none"
            calendarClassName="calender"
            minDate={new Date()}
            ref={endDatepickerRef}
            name="test"
          />
          <button
            type="button"
            onClick={() => endDatepickerRef.current.setOpen((prev) => !prev)}
            className={"absolute right-2 top-1/2 block -translate-y-1/2"}
          >
            <CalenderDaysIcon />
          </button>
        </div>
      </FormRow>

      <FormRow label={"Is the organizer attending?"}>
        <div className={"flex items-center gap-2"}>
          <input
            type="checkbox"
            checked={isOrganizerAttending}
            onChange={(e) => setIsOrganizerAttending(e.target.checked)}
          />
          <label>Attend</label>
        </div>
      </FormRow>

      <FormRow label={"Is Groom are included?"}>
        <div className={"flex items-center gap-2"}>
          <input
            type="checkbox"
            checked={includeGroom}
            onChange={(e) => setIncludeGroom(e.target.checked)}
          />
          <label>Groom</label>
        </div>
      </FormRow>

      {includeGroom && (
        <FormRow expandCols={2} label={"Add Groom Details"}>
          <div className="grid grid-cols-2 gap-10">
            <input
              type="text"
              className="h-10 w-full rounded-md border border-neutral-700 bg-transparent p-2 outline-none focus:outline-blue-600 disabled:bg-gray-700 disabled:opacity-50"
              placeholder="Groom Name"
              value={groomDetails.name}
              onChange={(e) =>
                setGroomDetails((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <input
              type="email"
              className="h-10 w-full rounded-md border border-neutral-700 bg-transparent p-2 outline-none focus:outline-blue-600 disabled:bg-gray-700 disabled:opacity-50"
              placeholder="Groom Email"
              value={groomDetails.email}
              onChange={(e) =>
                setGroomDetails((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
        </FormRow>
      )}
      <>
        <AttendeeEmailInputFields
          attendees={attendees}
          updateAttendee={updateAttendee}
          removeAttendee={removeAttendee}
          minGroup={1}
          inputClassName={`${isAttendeeError && " border-red-500"}`}
        />

        <button
          className="inline-block w-fit rounded bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-700 px-4 py-1.5 text-sm capitalize text-white hover:bg-gradient-to-tr"
          onClick={addAttendee}
          type="button"
        >
          + Attendee
        </button>
      </>
    </div>
  );
}
