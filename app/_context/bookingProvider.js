"use client";
import React, { createContext, useContext, useState } from "react";

const PendingBookingContext = createContext();

export function BookingProvider({ children }) {
  const [pendingBookingCount, setPendingBookingCount] = useState(0);
  const [showCalenderView, setShowCalenderView] = useState(false);
  return (
    <PendingBookingContext.Provider
      value={{
        pendingBookingCount,
        setPendingBookingCount,
        showCalenderView,
        setShowCalenderView,
      }}
    >
      {children}
    </PendingBookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(PendingBookingContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}
