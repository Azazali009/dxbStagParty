export default function BookingTableHeader() {
  return (
    <div className="grid grid-cols-9 justify-items-center rounded-t-md border border-gray-700 bg-navyBlue py-2 text-xs">
      <p className="col-span-2">🎬Activities:</p>
      <p>Packages:</p>
      <p>Total Price:</p>
      <p>Paid Amount:</p>
      <p>Total Attendee:</p>
      <p>Destination:</p>
      <p className="col-span-2">organizer:</p>
    </div>
  );
}
