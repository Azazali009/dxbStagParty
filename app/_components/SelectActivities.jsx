"use client";

import { useEffect, useState } from "react";
import { getActivities } from "../_lib/data-services";
import { MultiSelect } from "react-multi-select-component";
import FormRow from "./FormRow";

export default function SelectActivities({
  setActivityPrices,
  activityPrices,
}) {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      const fetchedActivities = await getActivities();

      const formatted = fetchedActivities.map((act) => ({
        label: act.name,
        value: String(act.price), // value ko string mein convert karna zaroori hai
      }));

      setActivities(formatted);
      setLoading(false);
    }

    fetchActivities();
  }, []);

  if (loading)
    return (
      <div className="h-20 w-full space-y-2">
        <div className="h-4 w-[200px] animate-pulse rounded-md bg-tertiary"></div>
        <div className="h-12 w-full animate-pulse rounded-md bg-tertiary"></div>
      </div>
    );

  return (
    <FormRow label="Select Activities:">
      <MultiSelect
        options={activities}
        value={activityPrices}
        onChange={(selected) => {
          // Make sure selected value format is same as in options
          setActivityPrices(
            selected.map((item) => ({
              label: item.label,
              value: String(item.value),
            })),
          );
        }}
        labelledBy="Select Activities"
        className="custom-multi-select"
      />
    </FormRow>
  );
}
