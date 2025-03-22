import { getAttendees, updateAttendeeStatus } from "../../_lib/attendeeApi";
import { getBooking, getBookings } from "../../_lib/data-services";
import PaymentProgressBar from "../../_components/PaymentProgressBar";
import BookingTable from "../../_components/BookingTable";
import AttendeeDetail from "../../_components/AttendeeDetail";

export async function generateStaticParams() {
  const bookings = await getBookings();
  const ids = bookings.map((curBooking) => ({
    bookingID: String(curBooking.id),
  }));

  return ids;
}

export default async function page({ params }) {
  const booking = await getBooking(params.bookingID);
  const attendee = await getAttendees(booking?.id);

  // await updateAttendeeStatus("aizaz.0938@gmail.com");

  return (
    <div className="space-y-8 py-8">
      <PaymentProgressBar attendee={attendee} />
      <BookingTable booking={booking} attendee={attendee} />

      <AttendeeDetail attendee={attendee} />
    </div>
  );
}
