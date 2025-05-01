import { getAttendees, updateAttendeeStatus } from "../../_lib/attendeeApi";
import { getBooking, getBookings } from "../../_lib/data-services";
import PaymentProgressBar from "../../_adminComponents/PaymentProgressBar";
import BookingTable from "../../_components/BookingTable";
import AttendeeDetail from "../../_components/AttendeeDetail";

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
  const { attendees, user } = await getAttendees(booking?.id);

  // await updateAttendeeStatus("aizaz.0938@gmail.com");

  return (
    <div className="space-y-14 p-4 py-8">
      <PaymentProgressBar attendee={attendees} />
      <BookingTable
        organizerName={user?.fullName}
        booking={booking}
        attendee={attendees}
      />

      <AttendeeDetail attendee={attendees} />
    </div>
  );
}
