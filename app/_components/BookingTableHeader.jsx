export default function BookingTableHeader() {
  return (
    <div className="grid grid-cols-7 justify-items-center rounded-t-md border border-[#424242] bg-[#383838] py-2">
      <p>🎬Activity:</p>
      <p>💲Total Price:</p>
      <p>💵Paid Amount:</p>
      <p>👯‍♂️Total Attendee:</p>
      <p>🛣️Destination:</p>
      <p className="col-span-2">👮organizer:</p>
    </div>
  );
}
