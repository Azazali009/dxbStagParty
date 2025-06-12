"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

const PendingBookingContext = createContext();

export function BookingProvider({ children }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [pendingBookingCount, setPendingBookingCount] = useState(0);
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [showCalenderView, setShowCalenderView] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");

  // clear step query while closing booking popup modal
  function removeStepQueryFromUrl() {
    const params = new URLSearchParams(searchParams);
    // params.delete("search");
    params.delete("step");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <PendingBookingContext.Provider
      value={{
        phone,
        setPhone,
        whatsApp,
        setWhatsApp,
        bookingDate,
        setBookingDate,
        endDate,
        setEndDate,
        loading,
        setLoading,
        selectedActivities,
        setSelectedActivities,
        selectedPackages,
        setSelectedPackages,
        minDate,
        setMinDate,
        bookingNotes,
        setBookingNotes,
        pendingBookingCount,
        setPendingBookingCount,
        showCalenderView,
        setShowCalenderView,
        removeStepQueryFromUrl,
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
