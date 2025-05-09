import { Suspense } from "react";
import AdminStats from "../_components/AdminStats";
import Spinner from "../_components/Spinner";
import RecentBookings from "../_components/RecentBookings";
import RecentTopActivities from "../_components/RecentTopActivities";
import AdminHeader from "../_adminComponents/AdminHeader";
import PendingBookingPopup from "../_adminComponents/PendingBookingPopup";
export default async function page() {
  return (
    <div className="relative">
      <PendingBookingPopup />
      <AdminHeader />
      <div className="space-y-10 p-4">
        <Suspense fallback={<Spinner />}>
          <AdminStats />
          <RecentBookings />
          <RecentTopActivities />
        </Suspense>
      </div>
    </div>
  );
}
