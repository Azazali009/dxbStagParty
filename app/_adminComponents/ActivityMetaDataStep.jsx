import React from "react";
import FormRow from "../_components/FormRow";

export default function ActivityMetaDataStep() {
  return (
    <>
      <FormRow label="activity tags">
        <input
          type="text"
          placeholder="Adventure, Family, ..."
          name="activity_tags"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="mobility requirements">
        <input
          type="text"
          placeholder="Not wheelchair accessible"
          name="mobility_requirements"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="minimum age">
        <input
          type="number"
          placeholder="18"
          name="minimum_age"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="alcohol included">
        <select
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          name="alcohol_included"
          id=""
        >
          <option value="">alcohol included?</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </FormRow>

      <FormRow label="media friendly">
        <select
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          name="media_friendly"
          id=""
        >
          <option value="">Is media friendly?</option>
          <option value="true">Yes</option>
          <option value="false">NO</option>
        </select>
      </FormRow>

      <FormRow label="safety certifications">
        <input
          type="text"
          placeholder="ISO 9001, Local Tourism Cert, ..."
          name="safety_certifications"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="insurance provided">
        <select
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          name="insurance_provided"
          id=""
        >
          <option value="">insurance provided?</option>
          <option value="true">Yes</option>
          <option value="false">NO</option>
        </select>
      </FormRow>
    </>
  );
}
