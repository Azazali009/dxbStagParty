import React, { useState } from "react";
import FormRow from "./FormRow";
import { useBooking } from "../_context/bookingProvider";

export default function OrganiserBookingDetails({ email, name }) {
  const { phone, setPhone, whatsApp, setWhatsApp } = useBooking();
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  return (
    <>
      <FormRow label={"Organizer Email:"}>
        <input
          type="email"
          disabled
          value={email}
          placeholder="organizer@email.com"
          // onChange={(e) => setOrganizerEmail(e.target.value)}
          className="h-10 rounded-md border-none bg-primary px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600 disabled:opacity-50"
          autoComplete="on"
          required
        />
      </FormRow>
      <FormRow label={"Organizer Name:"}>
        <input
          type="text"
          disabled
          value={name}
          placeholder="Organizer name"
          // onChange={(e) => setOrganizerName(e.target.value)}
          className="h-10 rounded-md border-none bg-primary px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600 disabled:opacity-50"
          autoComplete="on"
          required
        />
      </FormRow>
      <FormRow label={"Phone:"}>
        <input
          type="text"
          value={phone}
          placeholder="+971 4 XXX XXXX"
          onChange={(e) => setPhone(e.target.value)}
          className="h-10 rounded-md border-none bg-primary px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600 disabled:opacity-50"
          autoComplete="on"
          required
        />
      </FormRow>
      {showWhatsApp && (
        <FormRow label={"WhatsApp"}>
          <input
            type="text"
            value={whatsApp}
            placeholder="+971 4 XXX XXXX"
            onChange={(e) => setWhatsApp(e.target.value)}
            className="h-10 rounded-md border-none bg-primary px-2 text-sm placeholder:text-sm focus:outline-none focus:outline-blue-600 disabled:opacity-50"
            autoComplete="on"
            required
          />
        </FormRow>
      )}
      <div className="mb-2 flex items-center gap-2 px-1">
        <input
          type="checkbox"
          id="whatsapp-toggle"
          checked={showWhatsApp}
          onChange={() => setShowWhatsApp(!showWhatsApp)}
        />
        <label htmlFor="whatsapp-toggle" className="text-sm text-white">
          WhatsApp (if different)?
        </label>
      </div>
    </>
  );
}
