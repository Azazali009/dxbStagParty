import { getCurrentUser } from "../_lib/getCurrentUser";
import ActivityBanner from "./ActivityBanner";
import ActivityDetailSections from "./ActivityDetailSections";
import ActivitySupportSections from "./ActivitySupportSections";
import RelatedActivities from "./RelatedActivities";
import SingleActivityCta from "./SingleActivityCta";

export default async function ActivityDetails({ activity }) {
  const { id, category } = activity;
  const user = await getCurrentUser();
  return (
    <div className="space-y-12 text-softGold">
      <ActivityBanner activity={activity} user={user} />
      <ActivityDetailSections activity={activity} user={user} />
      <ActivitySupportSections activity={activity} />
      <RelatedActivities category={category?.name} id={id} />
      <SingleActivityCta />
    </div>
  );
}
