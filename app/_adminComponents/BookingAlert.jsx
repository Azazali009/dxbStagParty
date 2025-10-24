import React from "react";
import FormRow from "../_components/FormRow";
import { useSupplier } from "../_context/SupplierProvider";

export default function BookingAlert() {
  const { formData, handleChange } = useSupplier();
  return (
    <>
      <FormRow label="preferred communication channel">
        <select
          name="preferred_communication_channel"
          multiple
          size={3}
          value={formData.preferred_communication_channel}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </FormRow>

      <FormRow label="response time expectation">
        <input
          type="text"
          placeholder="Within 24 hours"
          name="response_time_expectation"
          autoComplete="on"
          value={formData.response_time_expectation}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <div className="flex flex-col gap-2 text-xs xs:text-sm">
        <div className="flex items-center gap-2">
          <label
            htmlFor=""
            className="text-[9px] font-medium capitalize xs:text-sm"
          >
            auto reminder triggers
          </label>
          <span title="Add auto reminder triggers.">ℹ️</span>
        </div>
        <input
          type="text"
          placeholder="24"
          name="auto_reminder_triggers"
          value={formData.auto_reminder_triggers}
          onChange={handleChange}
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </div>

      <FormRow label="custom booking notes">
        <textarea
          name="custom_booking_notes"
          className="w-full rounded-md border border-neutral-700 bg-primary p-4"
          id="full_description"
          placeholder="Bring ID and wear outdoor shoes ..."
          cols={5}
          rows={5}
          value={formData.custom_booking_notes}
          onChange={handleChange}
        ></textarea>
      </FormRow>
    </>
  );
}
