import { Suspense } from "react";
import AdminStats from "../_components/AdminStats";
import Spinner from "../_components/Spinner";
import RecentBookings from "../_components/RecentBookings";
import RecentTopActivities from "../_components/RecentTopActivities";
import AdminHeader from "../_adminComponents/AdminHeader";
import PendingBookingPopup from "../_adminComponents/PendingBookingPopup";
import AdminBookingCalender from "../_adminComponents/AdminBookingCalendar";
import { getBookings } from "../_lib/data-services";
import { getCurrentUser } from "../_lib/getCurrentUser";

export default async function page() {
  // const bookings = await getBookings();

  let bookings = [];
  let errorOccurred = false;

  try {
    bookings = await getBookings();
  } catch (err) {
    console.error("Booking fetch failed:", err);
    errorOccurred = true;
  }

  if (errorOccurred) {
    return (
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold text-red-600">
            Something went wrong
          </h1>
          <p className="text-gray-500">
            We couldn&apos;t load bookings right now. Please refresh the page.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative space-y-10 p-4">
      <AdminHeader />
      <AdminBookingCalender bookings={bookings} />
      <PendingBookingPopup />
      <div className="space-y-10">
        <Suspense fallback={<Spinner />}>
          <AdminStats />
          <RecentBookings />
          <RecentTopActivities />
        </Suspense>
      </div>
    </div>
  );
}
