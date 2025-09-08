import React from "react";
import FormRow from "../_components/FormRow";
import { useSupplier } from "../_context/SupplierProvider";

export default function DocumentsLegal() {
  const { formData, handleChange } = useSupplier();
  return (
    <>
      <FormRow label="trade license">
        <input
          type="text"
          placeholder="URL"
          name="trade_license"
          autoComplete="on"
          value={formData.trade_license}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="insurance certificate">
        <input
          type="text"
          placeholder="URL"
          name="insurance_certificate"
          autoComplete="on"
          value={formData.insurance_certificate}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="id verification">
        <input
          type="text"
          placeholder="URL"
          name="id_verification"
          autoComplete="on"
          value={formData.id_verification}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="contract agreement">
        <input
          type="text"
          placeholder="URL"
          name="contract_agreement"
          autoComplete="on"
          value={formData.contract_agreement}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="exclusivity confirmed">
        <select
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          name="exclusivity_confirmed"
          value={formData.exclusivity_confirmed}
          onChange={handleChange}
          id=""
        >
          <option value="">Is exclusivity confirmed?</option>
          <option value="true">Yes</option>
          <option value="false">NO</option>
        </select>
      </FormRow>
    </>
  );
}
