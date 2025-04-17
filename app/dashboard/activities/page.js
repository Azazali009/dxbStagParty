import ActivityRow from "../../_components/ActivityRow";
import { getActivities } from "../../_lib/data-services";

export default async function Page() {
  const Activities = await getActivities();
  return (
    <div className="">
      <div className="grid grid-cols-8 justify-items-center border border-navyBlue/30 py-2 text-sm">
        <p></p>
        <p>Name</p>
        <p>Price</p>
        <p>Duration</p>
        <p>Destination</p>
        <p>Group Size</p>
        <p className="col-span-2">Action</p>
      </div>
      {Activities.map((activity) => (
        <ActivityRow key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
