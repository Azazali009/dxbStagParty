export default function BookingTableHeader() {
  return (
    <div className="grid grid-cols-10 justify-items-center rounded-t-md border border-b-0 border-gray-700 bg-navyBlue py-2 text-center text-xs">
      <p className="col-span-2">Activities</p>
      <p>Packages</p>
      <p>Total Price</p>
      <p>Paid Amount</p>
      <p>Total Attendee</p>
      <p>Destination</p>
      <p>Organizer Name</p>
      <p className="col-span-2">organizer email</p>
    </div>
  );
}
