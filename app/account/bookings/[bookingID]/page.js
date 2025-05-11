import { getAttendees } from "../../../_lib/attendeeApi";
import { getBooking, getBookings } from "../../../_lib/data-services";
import PaymentProgressBar from "../../../_adminComponents/PaymentProgressBar";
import BookingsActions from "../../../_adminComponents/BookingsActions";
import BookingTable from "../../../_components/BookingTable";
import AttendeeDetail from "../../../_components/AttendeeDetail";
import { getCurrentUser } from "../../../_lib/getCurrentUser";
import { notFound } from "next/navigation";

export const revalidate = 0;
export async function generateStaticParams() {
  const bookings = await getBookings();
  const ids = bookings.map((curBooking) => ({
    bookingID: String(curBooking.id),
  }));

  return ids;
}

export default async function page({ params }) {
  const curAuthUser = await getCurrentUser();
  const booking = await getBooking(params.bookingID);
  // Check the right user could see only his own bookings
  if (booking.userId !== curAuthUser.id) return notFound();
  const { attendees, user } = await getAttendees(booking?.id);

  return (
    <div className="space-y-14 p-4 py-8">
      <BookingsActions booking={booking} />
      <PaymentProgressBar
        bookingPaymentStatus={booking.paymentStatus}
        attendee={attendees}
      />
      <BookingTable booking={booking} attendee={attendees} user={user} />

      <AttendeeDetail
        bookingPaymentStatus={booking.paymentStatus}
        attendee={attendees}
      />
    </div>
  );
}
