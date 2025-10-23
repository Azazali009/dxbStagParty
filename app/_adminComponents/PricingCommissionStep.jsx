import React from "react";
import FormRow from "../_components/FormRow";
import { useSupplier } from "../_context/SupplierProvider";

export default function PricingCommissionStep() {
  const { formData, setFormData, handleChange } = useSupplier();

  const { bankDetails } = formData;
  return (
    <>
      <FormRow label="base price">
        <input
          type="number"
          placeholder="200"
          name="base_price"
          autoComplete="on"
          value={formData.base_price}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="discounted price">
        <input
          type="number"
          placeholder="150"
          name="discounted_price"
          value={formData?.discounted_price}
          onChange={handleChange}
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="deposit required">
        <select
          name="deposit_required"
          defaultValue=""
          value={formData?.deposit_required}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        >
          <option value="" disabled>
            Select option
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </FormRow>

      <FormRow label="cancellation_terms">
        <input
          type="text"
          placeholder="72 hours in advance"
          name="cancellation_terms"
          value={formData.cancellation_terms}
          onChange={handleChange}
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="payment preferences">
        <select
          name="payment_preferences"
          value={formData.payment_preferences}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        >
          <option value="">Choose payment method</option>
          <option value="payoneer">Payoneer</option>
          <option value="wise">Wise</option>
          <option value="bank">Bank</option>
        </select>
      </FormRow>

      {/* <FormRow label="bank details" className={"space-y-2 ![grid-column:1/-1]"}>
        <label>
          Bank Name
          <input
            type="text"
            value={bankDetails?.bank}
            name="bank_details"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                bankDetails: {
                  ...prev.bankDetails,
                  bank: e.target.value,
                },
              }))
            }
          />
        </label>

        <label>
          IBAN Number
          <input
            type="text"
            value={bankDetails?.iban}
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                bankDetails: {
                  ...prev.bankDetails,
                  iban: e.target.value,
                },
              }))
            }
          />
        </label>
      </FormRow> */}
    </>
  );
}
