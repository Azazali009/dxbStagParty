import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef } from "react";
import { useBooking } from "../_context/bookingProvider";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import FormRow from "./FormRow";
import SelectActivities from "./SelectActivities";
import SelectPackages from "./SelectPackages";
import { parseDurationBooking } from "../_lib/helpers";
import { getActivities } from "../_lib/data-services";
import { getPlanningSessionByUserId } from "../_lib/apiPlanningSession";

export default function BookingDetails({
  id,
  duration,
  user,
  curPrice,
  curActivity,
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
    isOrganizerAttending,
    setIsOrganizerAttending,
    includeGroom,
    setIncludeGroom,
    groomDetails,
    setGroomDetails,
  } = useBooking();

  const datepickerRef = useRef(null);
  const datepickerRef2 = useRef(null);

  // Handle start date change
  const handleStartDateChange = (date) => {
    setBookingDate(date);
  };
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  useEffect(() => {
    if (bookingDate && duration) {
      const { amount, unit } = parseDurationBooking(duration);

      const end = new Date(bookingDate);
      if (isNaN(end.getTime())) return;

      unit === "hours"
        ? end.setHours(end.getHours() + amount)
        : end.setMinutes(end.getMinutes() + amount);

      setEndDate(end);
    }
  }, [bookingDate, duration, setEndDate]);

  useEffect(() => {
    async function fetchActivities() {
      const planningSession = await getPlanningSessionByUserId(user.id);
      const activityIds = planningSession?.activityIds || [];
      const fetchedActivities = await getActivities();

      const selectedActivities = fetchedActivities.filter((activity) =>
        activityIds.includes(activity.id),
      );
      setSelectedActivities([
        { label: curActivity, value: id, price: curPrice },
        ...selectedActivities.map((act) => ({
          ...act,
          label: act.name,
          value: act.id,
          duration: act.duration,
        })),
      ]);
    }
    fetchActivities();
  }, [setSelectedActivities, user.id, curActivity, curPrice, id]);

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
