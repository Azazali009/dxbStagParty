import React from "react";

// meta data
export const metadata = {
  title: "DXB Stag Party - Term and Conditions",
  description:
    "Review the DXB Stag Party terms and conditions to understand our booking policies, usage rules, and guest responsibilities.",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-5xl p-6 text-gray-400">
      <h1 className="mb-8 text-center text-3xl font-bold">
        DXB Stag Parties – Terms and Conditions
      </h1>
      <p className="mb-4 text-center text-sm text-gray-500">
        Effective Date: 01 May 2025
      </p>

      <ol className="list-decimal space-y-6 pl-6">
        <li>
          <strong>Scope of Service:</strong> DXB Stag Parties acts as a
          facilitator between customers and third-party Suppliers and Partners.
        </li>
        <li>
          <strong>Booking Process:</strong> Bookings must be made via official
          channels. A 15% deposit is required. Priority Fee of AED 1,000 applies
          if booking within 30 days.
        </li>
        <li>
          <strong>Pricing and Payment Terms:</strong> Full payment is due 42
          days before the event. Prices may change due to errors or supplier
          updates.
        </li>
        <li>
          <strong>Group Size and Attendance:</strong> Only approved guests may
          participate. Unauthorized guests are not permitted.
        </li>
        <li>
          <strong>Extras and Additional Purchases:</strong> DXB Stag Parties is
          not responsible for purchases made directly with suppliers.
        </li>
        <li>
          <strong>Cancellations and Refunds:</strong> 50% refund if canceled 42+
          days in advance. No refund otherwise.
        </li>
        <li>
          <strong>Changes to Bookings:</strong> Changes are subject to
          availability and may incur extra costs.
        </li>
        <li>
          <strong>Suppliers and Partners:</strong> Their terms also apply.
          Bypassing DXB is not allowed.
        </li>
        <li>
          <strong>Behaviour and Conduct:</strong> Respectful behavior is
          required. Breaches may lead to removal without refund.
        </li>
        <li>
          <strong>Force Majeure and Weather:</strong> DXB is not liable for
          disruptions due to uncontrollable events.
        </li>
        <li>
          <strong>Limitations of Liability:</strong> Your participation is at
          your own risk. Liability is limited to received payments.
        </li>
        <li>
          <strong>Insurance and Waivers:</strong> Guests must be insured.
          Waivers may be required.
        </li>
        <li>
          <strong>Visa, Entry, and ID:</strong> You are responsible for valid
          visas and IDs.
        </li>
        <li>
          <strong>Complaints Procedure:</strong> Complaints must be submitted
          within 7 days. Public/social media complaints may breach terms.
        </li>
        <li>
          <strong>Data Sharing and Privacy:</strong> Booking info may be shared
          with suppliers and used for marketing (if opted-in).
        </li>
        <li>
          <strong>Website Content and Errors:</strong> Content is accurate to
          our knowledge but may change.
        </li>
        <li>
          <strong>Service Fees:</strong> DXB may introduce fees in future
          bookings.
        </li>
        <li>
          <strong>Pre-Authorization:</strong> We may pre-authorize cards for
          security deposits.
        </li>
        <li>
          <strong>Right to Amend:</strong> Terms may change at any time. The
          website version is always the latest.
        </li>
        <li>
          <strong>Governing Law:</strong> These terms are governed by UAE law
          and the Dubai courts.
        </li>
      </ol>

      <div className="mt-12 text-center">
        <p className="font-semibold">
          For questions, contact:{" "}
          <a
            href="mailto:t&cs@dxbstagparties.com"
            className="text-blue-600 underline"
          >
            t&cs@dxbstagparties.com
          </a>
        </p>
      </div>
    </div>
  );
}
