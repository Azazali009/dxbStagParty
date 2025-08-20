import { getAttendees } from "../../../_lib/attendeeApi";
import { getBooking, getBookings } from "../../../_lib/data-services";
import PaymentProgressBar from "../../../_adminComponents/PaymentProgressBar";
import BookingsActions from "../../../_adminComponents/BookingsActions";
import BookingTable from "../../../_components/BookingTable";
import AttendeeDetail from "../../../_components/AttendeeDetail";
import BookingRealtimeRefresher from "../../../_components/BookingRealtimeRefresher";
import Empty from "../../../_components/Empty";

export const revalidate = 0;
export async function generateStaticParams() {
  const bookings = await getBookings();
  const ids = bookings.map((curBooking) => ({
    bookingID: String(curBooking.id),
  }));

  return ids;
}

export default async function page({ params }) {
  const booking = await getBooking(params.bookingID);
  if (!booking) return <Empty name="Booking" />;
  const { attendees, user } = await getAttendees(booking?.id);

  // await updateAttendeeStatus("aizaz.0938@gmail.com");

  return (
    <div className="space-y-14 p-4 py-8">
      <BookingRealtimeRefresher bookingId={String(booking.id)} />
      <BookingsActions booking={booking} />
      <PaymentProgressBar
        bookingPaymentStatus={booking.paymentStatus}
        attendee={attendees}
      />
      <div className="space-y-4">
        <BookingTable booking={booking} attendee={attendees} user={user} />
        {booking.booking_notes && (
          <div className="w-fit space-x-4 rounded-md bg-yellow-100 p-4 text-yellow-600">
            <strong>Booking Notes:</strong>
            <span>{booking.booking_notes}</span>
          </div>
        )}
      </div>

      <AttendeeDetail
        bookingPaymentStatus={booking.paymentStatus}
        attendee={attendees}
        bookingID={booking.id}
      />
    </div>
  );
}
