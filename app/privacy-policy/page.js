import Link from "next/link";
import React from "react";

export default function Page() {
  const data = [
    {
      section: "1. Introduction",
      purpose: "Who you are and what this policy covers",
    },
    {
      section: "2. Information Collected",
      purpose:
        "What personal data you collect (basic stuff like names, emails, booking details)",
    },
    {
      section: "3. How Information Is Used",
      purpose:
        "Why you collect the info (booking management, communication, marketing if opted in)",
    },
    {
      section: "4. Sharing with Suppliers and Partners",
      purpose: "That you share only necessary info with suppliers/partners",
    },
    {
      section: "5. Marketing Communications",
      purpose:
        "Only if they opt-in (protects you legally for future newsletters, offers, etc.)",
    },
    {
      section: "6. Data Protection and Security",
      purpose: "Confirm you store data safely and aren’t irresponsible",
    },
    {
      section: "7. Data Retention",
      purpose: "How long you keep their info",
    },
    {
      section: "8. Customer Rights",
      purpose:
        "They can ask for their data or ask for deletion (light version)",
    },
    {
      section: "9. Changes to Policy",
      purpose: "You can update this anytime",
    },
    {
      section: "10. Contact Information",
      purpose: "How they can contact you about privacy matters",
    },
  ];
  return (
    <div className="space-y-10 px-8 py-14">
      <h1 className="text-5xl font-semibold">
        DXB Stag Parties – Privacy Policy
      </h1>
      <p>Effective Date: 01 May 2025</p>
      <p>
        At DXB Stag Parties, your privacy is important to us. This Privacy
        Policy explains how we collect, use, share, and protect your personal
        information when you use our services.
      </p>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Definitions</h2>
        <h2>In this Privacy Policy:</h2>
        <ul className="list-item list-inside space-y-2 font-light">
          <li>
            • DXB Stag Parties” means the booking platform and concierge service
            operated by us.
          </li>
          <li>
            • “Supplier” or “Partner” means any third-party company or
            individual providing services booked through us.
          </li>
          <li>
            • “Guest” or “Participant” means any person participating in
            experiences booked via DXB Stag Parties.
          </li>
          <li>
            • “Booking” means any reservation made via DXB Stag Parties for
            activities, packages, or events.
          </li>
          <li>
            • “Force Majeure” means any event outside of our control, including
            weather conditions, government restrictions, strikes, supplier
            failures, or other unforeseen disruptions.
          </li>
          <li>
            • “Website” means www.dxbstagparties.com (or any future site
            operated by us).
          </li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold">1).Who We Are</h2>
        <p>
          DXB Stag Parties (“we,” “us,” or “our”) is a premium stag party
          experience provider based in Dubai, United Arab Emirates. This Privacy
          Policy applies to all personal information collected through our
          website, communications, and services.
        </p>
      </div>
      <div>
        <h2 className="font-semibold">2). Information We Collect</h2>
        <p>We may collect and process the following personal information:</p>
        <ul>
          <li>• Full name</li>
          <li>• Email address</li>
          <li>• Phone number (including WhatsApp where provided)</li>
          <li>• Booking and activity details</li>
          <li>
            • Payment information (processed securely via third-party payment
            processors)
          </li>
          <li>• Preferences and special requirements for bookings</li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold">4). Sharing Your Information</h2>

        <ul>
          <li>
            • We share only the minimum required information with our Suppliers
            and Partners to fulfill your bookings.
          </li>
          <li>
            • We may share information with trusted service providers who
            support our operations (e.g., IT providers, payment processors).
          </li>
          <li>
            • We do not sell, rent, or trade your personal information to third
            parties for unrelated marketing purposes.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold">5). Marketing Communications</h2>

        <ul>
          <li>
            • If you opt in, we may send you promotional emails, offers, or
            updates related to DXB Stag Parties.
          </li>
          <li>
            • We may use photos, videos, or other media captured during previous
            events for marketing purposes across our website, social media, and
            promotional materials, unless you request otherwise in writing prior
            to your event.
          </li>
          <li>
            • We may use marketing channels and platforms available now or
            introduced in the future to promote our services.
          </li>
          <li>
            • You can unsubscribe from marketing communications at any time by
            following the unsubscribe link in our emails or contacting us
            directly.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold">6). Data Protection and Security</h2>

        <ul>
          <li>
            • We take reasonable and appropriate measures to protect your
            personal information against unauthorized access, alteration,
            disclosure, or destruction.
          </li>
          <li>
            • Our website uses cookies and similar technologies to enhance your
            browsing experience, analyze site traffic, and deliver relevant
            promotions. By using our website, you consent to our use of cookies.
          </li>
          <li>
            • However, no method of electronic transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold">7). Data Retention</h2>

        <ul>
          <li>
            • We retain your personal information for as long as necessary to
            fulfill your bookings and meet any legal or operational
            requirements.
          </li>
          <li>
            • If you request the deletion of your data, we will comply unless we
            are legally required to retain it for legitimate business purposes.
          </li>
          <li>
            • However, no method of electronic transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold">8). Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>• Access a copy of your personal information we hold</li>
          <li>• Correct or update your personal information</li>
          <li>
            • Request deletion of your personal information (subject to legal
            requirements)
          </li>
          <li>• Object to or restrict certain data uses</li>
          <li>• Withdraw consent for marketing communications at any time</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the details
          below.
        </p>
      </div>
      <div>
        <h2 className="font-semibold">9.) Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be effective immediately when posted on our website. We encourage you
          to review this page regularly for any updates.
        </p>
      </div>
      <div>
        <h2 className="font-semibold">10.) Contact Us</h2>
        <p>
          For any questions, concerns, or requests regarding your personal
          information or this Privacy Policy, please contact us at:
        </p>
        <Link href={"tel:pp@dxbstagparties.com"}>
          Email: pp@dxbstagparties.com
        </Link>
      </div>
      <div className="space-y-6">
        <h2 className="text-center text-4xl font-semibold">
          Privacy Policy must cover to protect DXB Stag Parties properly:
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left text-sm text-gray-500">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 font-semibold">
                Section
              </th>
              <th className="border border-gray-300 px-4 py-2 font-semibold">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-300 px-4 py-3 font-medium">
                  {row.section}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {row.purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
