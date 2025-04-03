import { useEffect, useState } from "react";
import { getActivities } from "../_lib/data-services";
import FormRow from "../_components/FormRow";

export default function SelectActivities({ setActivityPrice, activityPrice }) {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState(null);
  // effect to fetch activities for selection
  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      const activities = await getActivities();
      setActivities(activities);
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
    <FormRow label={"Add more activities"}>
      <select
        id="activities"
        value={activityPrice}
        onChange={(e) => setActivityPrice(e.target.value)}
        className="h-12 rounded-md bg-tertiary px-2 text-sm placeholder:text-sm focus:outline-blue-600"
      >
        <option value={0}>select activities</option>
        {activities?.map((act) => (
          <option value={act.price} key={act.id}>
            {act.name}
          </option>
        ))}
      </select>
    </FormRow>
  );
}
