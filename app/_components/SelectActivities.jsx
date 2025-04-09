"use client";

import { useEffect, useState } from "react";
import { getActivities } from "../_lib/data-services";
import { MultiSelect } from "react-multi-select-component";
import FormRow from "./FormRow";

export default function SelectActivities({
  setSelectedActivities,
  selectedActivities,
  activityId,
}) {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  // Effect to fetch activities
  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      const fetchedActivities = await getActivities();

      setActivities(
        fetchedActivities
          ?.filter((act) => act.id !== activityId)
          ?.map((act) => ({
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
        <div className="h-4 w-[200px] animate-pulse rounded-md bg-tertiary"></div>
        <div className="h-10 w-full animate-pulse rounded-md bg-tertiary"></div>
      </div>
    );

  return (
    <FormRow label={"Select Activities:"}>
      <MultiSelect
        options={activities}
        value={selectedActivities} // Keep it controlled
        onChange={(selected) => {
          setSelectedActivities([...selected]); // Ensure state update happens outside of render
        }}
        labelledBy="Select Activities"
        className="custom-multi-select"
      />
    </FormRow>
  );
}
