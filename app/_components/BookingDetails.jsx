import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef } from "react";
import { useBooking } from "../_context/bookingProvider";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import FormRow from "./FormRow";
import SelectActivities from "./SelectActivities";
import SelectPackages from "./SelectPackages";
import { parseDuration } from "../_lib/helpers";

export default function BookingDetails({ id, duration }) {
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
  const datepickerRef = useRef(null);
  const datepickerRef2 = useRef(null);

  const handleStartDateChange = (date) => {
    setBookingDate(date);

    const { amount, unit } = parseDuration(duration);

    if (!isNaN(date?.getTime())) {
      const end = new Date(date);
      if (unit === "hours") end.setHours(end.getHours() + amount);
      else end.setMinutes(end.getMinutes() + amount);

      setEndDate(end);
    }
  };
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  useEffect(() => {
    if (bookingDate && !endDate && duration) {
      const { amount, unit } = parseDuration(duration);

      const end = new Date(bookingDate);
      unit === "hours"
        ? end.setHours(end.getHours() + amount)
        : end.setMinutes(end.getMinutes() + amount);

      setEndDate(end);
    }
  }, [bookingDate, endDate, duration, setEndDate]);

  return (
    <>
      <FormRow label={"Start Date"}>
        <div className="relative w-full rounded border border-gray-700">
          <DatePicker
            selected={bookingDate}
            onChange={(date) => handleStartDateChange(date)}
            showTimeSelect
            placeholderText="Select a date and time"
            timeIntervals={30}
            dateFormat={"dd/MM/yyyy  hh:mm aa"}
            timeFormat="hh:mm aa"
            className="h-10 w-full rounded-md bg-transparent p-2 outline-none focus:outline-blue-600 disabled:bg-gray-700 disabled:opacity-50"
            calendarClassName="calender"
            minDate={new Date()}
            ref={datepickerRef}
          />
          <button
            type="button"
            onClick={() => datepickerRef.current.setOpen((prev) => !prev)}
            className={"absolute right-2 top-1/2 block -translate-y-1/2"}
          >
            <CalenderDaysIcon />
          </button>
        </div>
      </FormRow>
      <FormRow label={"End Date"}>
        <div className="relative w-full rounded border border-gray-700">
          <DatePicker
            selected={isValidDate(endDate) ? endDate : null}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            placeholderText="Select a date and time"
            timeIntervals={30}
            dateFormat={"dd/MM/yyyy  hh:mm aa"}
            timeFormat="hh:mm aa"
            className="h-10 w-full rounded-md bg-transparent p-2 outline-none focus:outline-blue-600 disabled:bg-gray-700 disabled:opacity-50"
            calendarClassName="calender"
            minDate={new Date()}
            ref={datepickerRef2}
          />
          <button
            type="button"
            onClick={(e) => datepickerRef2.current.setOpen((prev) => !prev)}
            className={"absolute right-2 top-1/2 block -translate-y-1/2"}
          >
            <CalenderDaysIcon />
          </button>
        </div>
      </FormRow>

      <SelectActivities
        selectedActivities={selectedActivities}
        setSelectedActivities={setSelectedActivities}
        activityId={id}
      />
      <SelectPackages
        selectedPackages={selectedPackages}
        setSelectedPackages={setSelectedPackages}
        packageId={id}
      />
      <FormRow expandCols={2} label={"Booking Notes(Optional)"}>
        <textarea
          placeholder="Any booking notes?"
          value={bookingNotes}
          cols="30"
          rows="12"
          className="w-full rounded-md border border-gray-700 bg-transparent p-2 placeholder:text-sm focus:outline-none focus:outline-blue-600"
          onChange={(e) => setBookingNotes(e.target.value)}
          id="booking_notes"
        ></textarea>
      </FormRow>
    </>
  );
}
