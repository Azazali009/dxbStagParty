"use client";
import { createContext, useContext, useState } from "react";

const BuilderContext = createContext();

export default function PartyBuilderProvider({ children }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedActivityIds, setSelectedActivityIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activityBuffers, setActivityBuffers] = useState({});
  const [includeTransport, setIncludeTransport] = useState(false); // default off
  const [transportHours, setTransportHours] = useState(1); // minimum 1 hour

  const [attendees, setAttendees] = useState(() =>
    Array(1)
      .fill(0)
      .map(() => ({ email: "", name: "" })),
  );

  const [isAttendeeError, setIsAttendeeError] = useState(false);

  return (
    <BuilderContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedActivityIds,
        setSelectedActivityIds,
        selectedCategory,
        setSelectedCategory,
        attendees,
        setAttendees,
        activityBuffers,
        setActivityBuffers,
        includeTransport,
        setIncludeTransport,
        transportHours,
        setTransportHours,
        isAttendeeError,
        setIsAttendeeError,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
export function usePartyBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}
