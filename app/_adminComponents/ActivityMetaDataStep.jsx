import React from "react";
import FormRow from "../_components/FormRow";
import { useSupplier } from "../_context/SupplierProvider";

export default function ActivityMetaDataStep() {
  const { formData, handleChange } = useSupplier();
  return (
    <>
      <FormRow label="activity tags">
        <input
          type="text"
          placeholder="Adventure, Family, ..."
          name="activity_tags"
          value={formData.activity_tags}
          onChange={handleChange}
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="mobility requirements">
        <select
          name="mobility_requirements"
          defaultValue=""
          value={formData.mobility_requirements}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        >
          <option value="" disabled>
            Select option
          </option>
          <option value="yes">Wheelchair Accessible</option>
          <option value="no">Not Wheelchair Accessible</option>
        </select>
      </FormRow>

      <FormRow label="minimum age">
        <input
          type="number"
          placeholder="18"
          name="minimum_age"
          autoComplete="on"
          value={formData.minimum_age}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="alcohol included">
        <select
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          name="alcohol_included"
          value={formData.alcohol_included}
          onChange={handleChange}
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
          value={formData.media_friendly}
          onChange={handleChange}
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
          value={formData.safety_certifications}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="insurance provided">
        <select
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          name="insurance_provided"
          value={formData.insurance_provided}
          onChange={handleChange}
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
