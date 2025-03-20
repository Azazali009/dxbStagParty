import ActivityCard from "../_components/ActivityCard";
import { getActivities } from "../_lib/data-services";
import { Spotlight as SpotlightNew } from "../_components/ui/spotlight-new";
import Empty from "../_components/Empty";
import AnimatedHeading from "../_components/AnimatedHeading";

export default async function Paintball() {
  const Activities = await getActivities();

  return (
    <div className="space-y-20 overflow-x-hidden p-6 antialiased">
      <SpotlightNew />
      <AnimatedHeading> Epic Stag Do Activities</AnimatedHeading>
      {/* <Spotlight className="-top-40 left-0 md:-top-0 md:left-60" fill="white" /> */}
      {!Activities.length ? (
        <Empty name={"Activities"} />
      ) : (
        <div className="mx-auto grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
