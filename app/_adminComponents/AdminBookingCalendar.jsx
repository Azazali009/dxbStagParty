"use client";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useBooking } from "../_context/bookingProvider";

const localizer = momentLocalizer(moment);

export default function AdminBookingCalender({ bookings }) {
  const { showCalenderView } = useBooking();

  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = bookings?.map((booking) => ({
    id: booking.id,
    title: `Organiser: ${booking.users.fullName} \n BookingID: ${booking.id} \n Payment Status: ${booking.paymentStatus} \n Book at: ${format(booking.created_at, "MMMM d, yyyy 'at' h:mm a")}`,
    start: new Date(booking.created_at),
    end: new Date(booking.created_at),
    status: booking.paymentStatus,
    allDay: true,
  }));
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.status === "completed" ? "#047857 " : "#b91c1c ",
    },
  });

  return (
    <AnimatePresence>
      {showCalenderView && (
        <motion.div
          key="calender-view"
          className="space-y-6 rounded p-4 shadow-md"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Calendar
            localizer={localizer}
            eventPropGetter={eventStyleGetter}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={["month", "week", "day"]}
            defaultView="month"
            date={currentDate}
            onNavigate={setCurrentDate}
            view={currentView}
            onView={setCurrentView}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
