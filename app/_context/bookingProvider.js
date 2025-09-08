"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { createClient } from "../_utils/supabase/client";
import { useSupabaseSubscription } from "../_hooks/useSupabaseSubscription";

const PendingBookingContext = createContext();

export default function BookingProvider({ children }) {
  useSupabaseSubscription({ table: "booking", filterKey: "booking" });
  const { user } = useAuth();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [pendingBookingCount, setPendingBookingCount] = useState(0);
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [showCalenderView, setShowCalenderView] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [isOrganizerAttending, setIsOrganizerAttending] = useState(false);
  const [includeGroom, setIncludeGroom] = useState(false);
  const [groomDetails, setGroomDetails] = useState({ name: "", email: "" });
  // clear step query while closing booking popup modal
  function removeStepQueryFromUrl() {
    const params = new URLSearchParams(searchParams);
    // params.delete("search");
    params.delete("step");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // load current user planning session data for booking form

  useEffect(() => {
    if (!user?.id) return;
    async function getCurrentUserPlanningData() {
      const supabase = createClient();
      let { data } = await supabase
        .from("planning_sessions")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (data?.start_date) {
        setBookingDate(new Date(data.start_date));
      }
      if (!Array.isArray(data?.attendees) || data.attendees.length === 0) {
        // Show default if attendees is missing or empty
        setAttendees([{ email: "", name: "" }]);
      } else {
        setAttendees(data.attendees);
      }
    }
    getCurrentUserPlanningData();
  }, [user?.id]);
  return (
    <PendingBookingContext.Provider
      value={{
        phone,
        setPhone,
        whatsApp,
        setWhatsApp,
        bookingDate,
        setBookingDate,
        attendees,
        setAttendees,
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
        isOrganizerAttending,
        setIsOrganizerAttending,
        includeGroom,
        setIncludeGroom,
        groomDetails,
        setGroomDetails,
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
