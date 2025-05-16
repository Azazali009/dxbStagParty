import Image from "next/image";
import { auth } from "../_lib/auth";
import BookingWindowAndButton from "./BookingWindowAndButton";
import ActivityBanner from "./ActivityBanner";
import { getCurrentUser } from "../_lib/getCurrentUser";
import ActivityDetailSections from "./ActivityDetailSections";
import ActivitySupportSections from "./ActivitySupportSections";
import RelatedActivities from "./RelatedActivities";

export default async function ActivityDetails({ activity }) {
  const { id, category } = activity;
  const user = await getCurrentUser();
  return (
    <div className="space-y-12 text-softGold">
      <ActivityBanner activity={activity} user={user} />
      <ActivityDetailSections activity={activity} />
      <ActivitySupportSections activity={activity} />
      <RelatedActivities category={category} id={id} />
    </div>
  );
}
