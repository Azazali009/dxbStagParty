import React from "react";
import FormRow from "../_components/FormRow";

export default function BookingAlert() {
  return (
    <>
      <FormRow label="preferred communication channel">
        <input
          type="text"
          placeholder="WhatsApp"
          name="preferred_communication_channel"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="response time expectation">
        <input
          type="text"
          placeholder="Within 24 hours"
          name="response_time_expectation"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="auto reminder triggers">
        <input
          type="text"
          placeholder="24"
          name="auto_reminder_triggers"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="custom booking notes">
        <textarea
          name="custom_booking_notes"
          className="w-full rounded-md border border-neutral-700 bg-primary p-4"
          id="full_description"
          placeholder="Bring ID and wear outdoor shoes ..."
          cols={5}
          rows={5}
        ></textarea>
      </FormRow>
    </>
  );
}
