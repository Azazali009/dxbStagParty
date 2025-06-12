import React, { useRef } from "react";
import FormRow from "./FormRow";
import SelectPackages from "./SelectPackages";
import SelectActivities from "./SelectActivities";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import { useBooking } from "../_context/bookingProvider";

export default function BookingDetails({
  minGroup,
  maxGroup,
  emails,
  setEmails,
  activityId,
}) {
  const {
    bookingDate,
    setBookingDate,
    endDate,
    setEndDate,

    selectedActivities,
    setSelectedActivities,
    selectedPackages,
    setSelectedPackages,
    bookingNotes,
    setBookingNotes,
    minDate,
  } = useBooking();
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  return (
    <>
      <FormRow label={"Start Date:"}>
        <div className="relative w-full">
          <input
            ref={inputRef1}
            type="date"
            min={minDate}
            id="date"
            value={bookingDate}
            placeholder="yyyy-MM-DD"
            onChange={(e) => setBookingDate(e.target.value)}
            className="h-10 w-full rounded-md border-none bg-primary px-2 placeholder:text-sm focus:outline-none focus:outline-blue-600"
            required
          />
          <button
            type="button"
            onClick={() => inputRef1.current.showPicker((show) => !show)}
            className="absolute right-2 top-1/2 block -translate-y-1/2 duration-300 active:scale-90"
          >
            <CalenderDaysIcon />
          </button>
        </div>
      </FormRow>
      <FormRow label={"End Date:"}>
        <div className="relative w-full">
          <input
            ref={inputRef2}
            type="date"
            min={minDate}
            id="date"
            value={endDate}
            placeholder="yyyy-MM-DD"
            onChange={(e) => setEndDate(e.target.value)}
            className="h-10 w-full rounded-md border-none bg-primary px-2 placeholder:text-sm focus:outline-none focus:outline-blue-600"
            required
          />
          <button
            type="button"
            onClick={() => inputRef2.current.showPicker((show) => !show)}
            className="absolute right-2 top-1/2 block -translate-y-1/2 duration-300 active:scale-90"
          >
            <CalenderDaysIcon />
          </button>
        </div>
      </FormRow>

      <SelectActivities
        selectedActivities={selectedActivities}
        setSelectedActivities={setSelectedActivities}
        activityId={activityId}
      />
      <SelectPackages
        selectedPackages={selectedPackages}
        setSelectedPackages={setSelectedPackages}
      />
      <FormRow expandCols={2} label={"Booking Notes(Optional)"}>
        <textarea
          placeholder="any booking notes?"
          value={bookingNotes}
          cols="30"
          rows="12"
          className="w-full rounded-md border-none bg-primary px-2 placeholder:text-sm focus:outline-none focus:outline-blue-600"
          onChange={(e) => setBookingNotes(e.target.value)}
          id="booking_notes"
        ></textarea>
      </FormRow>
    </>
  );
}
