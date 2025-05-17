import { getActivities, getActivity } from "../../_lib/data-services";

import ActivityDetails from "../../_components/ActivityDetails";
import Empty from "../../_components/Empty.jsx";

export const revalidate = 0;

export async function generateStaticParams() {
  const activities = await getActivities();
  const ids = activities.map((curActivity) => ({
    activityId: String(curActivity.id),
  }));
  return ids;
}

export default async function Page({ params }) {
  const activity = await getActivity(params.activityId);

  if (!activity) return <Empty name={"Activity"} />;

  return (
    <div className="mx-auto -mt-[110px] max-w-full space-y-6 bg-[#3D1F00] text-navyBlue">
      <ActivityDetails activity={activity} />
    </div>
  );
}
