import React from "react";
import FormRow from "../_components/FormRow";

export default function PricingCommissionStep({ bankDetails, setBankDetails }) {
  return (
    <>
      <FormRow label="base price">
        <input
          type="number"
          placeholder="200"
          name="base_price"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="discounted price">
        <input
          type="number"
          placeholder="150"
          name="discounted_price"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      {/* <FormRow label="add ons">
                  <input
                    type="text"
                    placeholder="200"
                    name="add_ons"
                    autoComplete="on"
                    className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
                  />
                </FormRow> */}

      <FormRow label="deposit required">
        <select
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          name="deposit_required"
          id=""
        >
          <option value="">Is deposite required?</option>
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </FormRow>

      <FormRow label="cancellation_terms">
        <input
          type="text"
          placeholder="72 hours in advance"
          name="cancellation_terms"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="commission agreement">
        <input
          type="text"
          placeholder="10% per booking"
          name="commission_agreement"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="payment preferences">
        <input
          type="text"
          placeholder="Bank Transfer"
          name="payment_preferences"
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>

      <FormRow label="bank details" className={"space-y-2 ![grid-column:1/-1]"}>
        <label>
          Bank Name
          <input
            type="text"
            value={bankDetails.bank}
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
            onChange={(e) =>
              setBankDetails({ ...bankDetails, bank: e.target.value })
            }
          />
        </label>

        <label>
          IBAN Number
          <input
            type="text"
            value={bankDetails.iban}
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
            onChange={(e) =>
              setBankDetails({ ...bankDetails, iban: e.target.value })
            }
          />
        </label>
      </FormRow>
    </>
  );
}
