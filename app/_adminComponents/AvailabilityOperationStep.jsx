import React from "react";
import FormRow from "../_components/FormRow";
import BlackoutRange from "../_components/BlackOutRange";
import { useSupplier } from "../_context/SupplierProvider";
import HoursWeekly from "../_components/HoursWeekly";

export default function AvailabilityOperationStep() {
  const { range, setRange, formData, handleChange } = useSupplier();
  return (
    <>
      <FormRow label="available hours" expandCols={2}>
        <HoursWeekly />
      </FormRow>
      <FormRow label="blackout dates (range)" expandCols={2}>
        <BlackoutRange range={range} setRange={setRange} />
      </FormRow>

      <FormRow label="lead time">
        <select
          name="lead_time_required"
          defaultValue=""
          value={formData.lead_time_required}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        >
          <option value="" disabled>
            Select lead time
          </option>
          <option value="24h">24 Hours</option>
          <option value="48h">48 Hours</option>
          <option value="72h">72 Hours</option>
          <option value="1w">1 Week</option>
          <option value="2w">2 Weeks</option>
          <option value="1m">1 Month</option>
        </select>
      </FormRow>

      <FormRow label="min group size">
        <input
          type="number"
          placeholder="	2"
          name="min_group_size"
          value={formData.min_group_size}
          onChange={handleChange}
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="max group size">
        <input
          type="number"
          placeholder="12"
          name="max_group_size"
          value={formData.max_group_size}
          onChange={handleChange}
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="location type">
        <select
          name="location_type"
          defaultValue=""
          value={formData.location_type}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        >
          <option value="" disabled>
            Select location type
          </option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
          <option value="mixed">Mixed (Indoor + Outdoor)</option>
        </select>
      </FormRow>
    </>
  );
}
