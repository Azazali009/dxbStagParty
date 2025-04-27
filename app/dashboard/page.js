import { Suspense } from "react";
import AdminStats from "../_components/AdminStats";
import Spinner from "../_components/Spinner";
import RecentBookings from "../_components/RecentBookings";
import RecentTopActivities from "../_components/RecentTopActivities";
export default async function page() {
  return (
    <div className="space-y-10">
      <Suspense fallback={<Spinner />}>
        <AdminStats />
        <RecentBookings />
        <RecentTopActivities />
      </Suspense>
    </div>
  );
}
