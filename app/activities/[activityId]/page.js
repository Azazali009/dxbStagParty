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
    <div className="mx-auto max-w-full space-y-6 bg-white p-4 text-navyBlue">
      {/* <h1 className="text-xl font-bold sm:text-3xl">{name}</h1> */}
      {/* <div className="relative grid h-full grid-cols-1 items-start gap-8 lg:grid-cols-[2fr_1.1fr]">
        {/* Left Container */}
      {/* <SinglePageBookingDetails
        image={image}
        duration={duration}
        minAge={minAge}
      />
      {/* Right Container */}
      {/* <SinglePageBookingSection
        activityId={id}
        price={price}
        activityName={name}
        destinations={destinations}
        session={session}
      />  */}
      {/* </div> */}
      <ActivityDetails activity={activity} />
    </div>
  );
}
