"use client";
import React, { act, useEffect, useRef, useState, useTransition } from "react";
import SpinnerMini from "./SpinnerMini";
import FormRow from "./FormRow";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updatePlanning } from "../_lib/actions";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";
import toast from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";
import { getActivities } from "../_lib/data-services";
import { autoBuildTimeline } from "../_lib/helpers";
import PlanningFormTimeline from "./PlanningFormTimeline";
import { usePartyBuilder } from "../_context/PartyBuilderProvider";

export default function UpdateUserProfilePlanningForm({ data }) {
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const { activityBuffers, includeTransport, transportHours } =
    usePartyBuilder();
  const { start_date, activityIds } = data;

  const [isPending, startTransition] = useTransition();
  const [startDate, setStartDate] = useState(() =>
    start_date ? new Date(start_date) : null,
  );

  const [attendees, setAttendees] = useState(() =>
    Array.isArray(data?.attendees) && data.attendees.length > 0
      ? data.attendees
      : [{ email: "", phone: "" }],
  );

  const datepickerRef = useRef(null);

  //   add attendee function
  const addAttendee = () => {
    setAttendees((prev) => [...prev, { email: "", phone: "" }]);
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
  //   handle submit
  function handleSubmit(formData) {
    startTransition(async () => {
      const res = await updatePlanningWithData(formData);
      if (res?.error) return toast.error(res?.error);
      toast.success(
        "🎉 Your stag party plan has been updated! You can now start adding activities to build the perfect day.",
      );
    });
  }

  const updatePlanningWithData = updatePlanning.bind(null, {
    attendees,
    startDate,
    selectedActivityIds: selectedActivities.map((act) => act.value),
  });

  const timeline = autoBuildTimeline(
    selectedActivities,
    startDate,
    activityBuffers,
    includeTransport,
    transportHours,
  );
  // fetch selected activities based on activityIds
  useEffect(() => {
    async function fetchActivities() {
      const fetchedActivities = await getActivities();

      const selectedActivities = fetchedActivities.filter((activity) =>
        activityIds?.includes(activity.id),
      );
      setSelectedActivities(
        selectedActivities.map((act) => ({
          ...act,
          label: act.name,
          value: act.id,
          duration: act.duration,
        })),
      );
    }
    fetchActivities();
  }, [activityIds]);

  // fetch all activities for the dropdown
  useEffect(() => {
    async function fetchActivities() {
      const fetchedActivities = await getActivities();
      setActivities(
        fetchedActivities.map((act) => ({
          label: act.name,
          value: act.id,
        })),
      );
    }
    fetchActivities();
  }, []);

  return (
    <div className="space-y-5 p-4 xs:space-y-10 sm:space-y-10 sm:p-6">
      <h1 className="text-gradient bg-gradient-to-r from-matalicGold via-secondary to-matalicGold bg-clip-text text-base font-bold tracking-tight text-transparent drop-shadow-lg xs:text-xl sm:text-2xl lg:text-3xl">
        Make Changes to Your Plan
      </h1>

      <form
        action={async (formData) => handleSubmit(formData)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <FormRow label={"Start Date"}>
          <div className="relative w-full rounded border border-gray-700">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              placeholderText="Select a date and time"
              timeIntervals={30}
              dateFormat={"dd/MM/yyyy  hh:mm aa"}
              timeFormat="hh:mm aa"
              className="h-10 w-full bg-red-600 bg-transparent p-2 outline-none focus:outline-matalicGold disabled:bg-gray-700 disabled:opacity-50"
              calendarClassName="calender"
              minDate={new Date()}
              ref={datepickerRef}
              name="test"
            />
            <button
              type="button"
              onClick={(e) => datepickerRef.current.setOpen((prev) => !prev)}
              className={"absolute right-2 top-1/2 block -translate-y-1/2"}
            >
              <CalenderDaysIcon />
            </button>
          </div>
        </FormRow>

        <FormRow label={"Select Activities:"}>
          <MultiSelect
            options={activities}
            value={selectedActivities}
            onChange={(selected) => {
              setSelectedActivities([...selected]);
            }}
            labelledBy="Select Activities"
            className="custom-multi-select"
            hasSelectAll={false}
          />
        </FormRow>
        <div className="space-y-8">
          <AttendeeEmailInputFields
            attendees={attendees}
            updateAttendee={updateAttendee}
            removeAttendee={removeAttendee}
            minGroup={1}
            inputClassName={
              "h-10 rounded !border !border-gray-700 !border-solid p-2 outline-none focus:outline-matalicGold disabled:bg-gray-700 disabled:opacity-50"
            }
          />

          <div className="self-center">
            <button
              className="inline-block w-fit rounded bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-700 px-4 py-1.5 text-sm capitalize text-white hover:bg-gradient-to-tr"
              onClick={addAttendee}
              type="button"
            >
              + Attendee
            </button>
          </div>
        </div>

        <div className="mt-10 [grid-column:1/-1]">
          <PlanningFormTimeline timeline={timeline} />
        </div>
        <div className="[grid-column:1/-1]">
          <button
            disabled={isPending}
            className="mt-4 w-fit self-end rounded border border-matalicGold bg-transparent px-4 py-1.5 text-xs capitalize text-matalicGold duration-300 hover:bg-matalicGold hover:text-navyBlue disabled:cursor-not-allowed disabled:opacity-50 xs:px-6 xs:py-2 xs:text-base"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <SpinnerMini />

                <span>Updating...</span>
              </div>
            ) : (
              "update stag party plan"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
