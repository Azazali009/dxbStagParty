import { notFound } from "next/navigation";
import Booking from "../../../_components/Booking";
import Empty from "../../../_components/Empty";
import { getAttendees } from "../../../_lib/attendeeApi";
import { getBooking, getBookings } from "../../../_lib/data-services";
import { getCurrentUser } from "../../../_lib/getCurrentUser";

// revalidation
export const revalidate = 0;

// generate static params for single dynamic page
export async function generateStaticParams() {
  const bookings = await getBookings();
  const ids = bookings.map((curBooking) => ({
    bookingID: String(curBooking.id),
  }));

  return ids;
}

export default async function page({ params }) {
  const curAuthUser = await getCurrentUser();
  const bookingID = await params.bookingID;
  const booking = await getBooking(bookingID);

  if (!booking) return <Empty name="Booking" />;
  // Check the right user could see only his own bookings
  if (booking.userId !== curAuthUser.id) return notFound();
  const { attendees, user } = await getAttendees(booking?.id);

  return (
    <Booking
      booking={booking}
      bookingID={bookingID}
      curUser={curAuthUser}
      attendees={attendees}
    />
  );
}
