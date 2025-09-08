"use client";
import React, { useEffect, useState, useTransition } from "react";
import FormRow from "./FormRow";
import { MultiSelect } from "react-multi-select-component";
import { getActivities } from "../_lib/data-services";
import Button from "./Button";
import { addVoteAction } from "../_lib/userProfileAction";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";
import toast from "react-hot-toast";
import { useBooking } from "../_context/bookingProvider";

export default function ActivityVotingForm() {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [attendees, setAttendees] = useState(() => [{ email: "", name: "" }]);
  const [isPending, startTransition] = useTransition();
  const {
    isOrganizerAttending,
    setIsOrganizerAttending,
    includeGroom,
    setIncludeGroom,
    groomDetails,
    setGroomDetails,
  } = useBooking();

  function handleSubmit(formData) {
    if (
      includeGroom &&
      !groomDetails?.name?.trim() &&
      !groomDetails?.email?.trim()
    ) {
      return toast.error("Please provide groom details.");
    }
    startTransition(async () => {
      const res = await addVoteActionWithData(formData);
      if (res?.error) return toast.error(res?.error);
      toast.success("Vote session created successfully.");
    });
  }

  const addVoteActionWithData = addVoteAction.bind(null, {
    selectedActivities,
    attendees,
    isOrganizerAttending,
    groomDetails,
    includeGroom,
  });

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

  // Effect to fetch activities
  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      const fetchedActivities = await getActivities();

      setActivities(
        fetchedActivities?.map((act) => ({
          label: act.name,
          value: act.id,
          price: act.price,
        })),
      );
      setLoading(false);
    }
    fetchActivities();
  }, []);

  // Show loading placeholder
  if (loading)
    return (
      <div className="h-20 w-full space-y-2">
        <div className="h-4 w-[200px] animate-pulse rounded-md bg-navyBlue"></div>
        <div className="h-10 w-full animate-pulse rounded-md bg-navyBlue"></div>
      </div>
    );
  return (
    <div className="mx-auto my-8 max-w-3xl rounded-2xl border border-neutral-700 p-4">
      <form
        action={async (formData) => handleSubmit(formData)}
        className="space-y-8"
      >
        <h1 className="text-center text-2xl font-bold text-matalicGold sm:text-3xl md:text-4xl">
          Vote for Your Favorite Activity
        </h1>
        {selectedActivities?.length < 3 && (
          <p className="text-center font-medium text-yellow-500">
            Minimum &quot;3&quot; activities are required for a proper voting
            session.
          </p>
        )}
        <FormRow label={"Select Activities:"}>
          <MultiSelect
            options={activities}
            value={selectedActivities} // Keep it controlled
            onChange={(selected) => {
              setSelectedActivities([...selected]); // Ensure state update happens outside of render
            }}
            labelledBy="Select Activities"
            className="custom-multi-select"
            hasSelectAll={false}
          />
        </FormRow>

        <FormRow label={"Add Attendee contacts"}>
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
                  setGroomDetails((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
          </FormRow>
        )}
        <Button disable={isPending} variation="gold" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
}
