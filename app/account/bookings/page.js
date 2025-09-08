import BookingList from "../../_components/BookingList";
import { getBookingByUserId } from "../../_lib/data-services";
import { getCurrentUser } from "../../_lib/getCurrentUser";

export default async function Page() {
  const user = await getCurrentUser();

  const bookings = await getBookingByUserId(user?.id);
  if (!bookings.length || !user)
    return (
      <div className="mx-auto my-7 text-center">You have no bookings yet.</div>
    );
  return (
    <div className="space-y-4 py-10 lg:py-0">
      <h1 className="text-2xl font-semibold">My bookings</h1>
      <BookingList bookings={bookings} />
    </div>
  );
}
