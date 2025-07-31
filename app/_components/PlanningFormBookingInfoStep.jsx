import React, { useRef } from "react";
import FormRow from "./FormRow";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";
import { usePartyBuilder } from "../_context/PartyBuilderProvider";

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

      {/* <FormRow label={"Group Size"}>
        <input
          className="h-10 rounded-md border border-gray-700 bg-transparent p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="groupSize"
          placeholder="2-6"
          value={groupSize}
          onChange={(e) => setGroupSize(e.target.value)}
          required
        />
      </FormRow> */}

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
