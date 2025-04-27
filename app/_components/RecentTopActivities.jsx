import { getRecentTopActivities } from "../_lib/data-services";
import TopRecentActivitiesCards from "./TopRecentActivitiesCards";
export default async function RecentTopActivities() {
  const recentTopActivities = await getRecentTopActivities();
  return (
    <div className="space-y-4">
      <TopRecentActivitiesCards recentTopActivities={recentTopActivities} />
    </div>
  );
}
