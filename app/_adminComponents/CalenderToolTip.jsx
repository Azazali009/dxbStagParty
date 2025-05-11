import { useState } from "react";

export default function CustomEventWithPopup({ event }) {
  const [showPopup, setShowPopup] = useState(false);
  console.log(showPopup);
  return (
    <div
      className="relative z-50 bg-red-600"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <span>{event.title}</span>

      <div className="absolute left-0 top-6 z-50 mt-2 w-64 rounded border border-gray-200 bg-white p-3 text-sm text-green-700 shadow-lg">
        <p>
          <strong>Organizer:</strong> {event.title}
        </p>
        <p>
          <strong>Status:</strong> {event.status}
        </p>
        <p>
          <strong>Start:</strong> {event.start.toLocaleString()}
        </p>
        <p>
          <strong>Booking ID:</strong> {event.id}
        </p>
      </div>
    </div>
  );
}
