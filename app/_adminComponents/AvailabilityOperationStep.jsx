import React from "react";
import FormRow from "../_components/FormRow";

export default function AvailabilityOperationStep() {
  return (
    <>
      <FormRow label="available hours">
        <input
          type="text"
          placeholder="mon: 10-18, fri: 12-22, ..."
          name="available_hours"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>
      <FormRow label="blackout dates">
        <input
          type="text"
          placeholder="2025-12-25, 2025-01-01 ..."
          name="blackout_dates"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="lead time">
        <input
          type="text"
          placeholder="	48 (hours)"
          name="lead_time_required"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="min group size">
        <input
          type="number"
          placeholder="	2"
          name="min_group_size"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="max group size">
        <input
          type="number"
          placeholder="12"
          name="max_group_size"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="booking method">
        <input
          type="text"
          placeholder="Manual / Online"
          name="booking_method"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="location type">
        <input
          type="text"
          placeholder="Outdoor / Indoor"
          name="location_type"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>
    </>
  );
}
