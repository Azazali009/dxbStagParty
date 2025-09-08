import Link from "next/link";
import React from "react";

const supportLinks = [
  {
    id: 6000,
    text: "Contact",
    href: "/contact",
  },
  {
    id: 6001,
    text: "FAQs",
    href: "/faqs",
  },
  {
    id: 6002,
    text: "Terms",
    href: "#",
  },
  {
    id: 6003,
    text: "Privacy",
    href: "/privacy-policy",
  },
  {
    id: 6004,
    text: "Supplier Login",
    href: "/login",
  },
  {
    id: 6005,
    text: "Become a supplier",
    href: "/become_a_supplier",
  },
  {
    id: 6006,
    text: "Careers",
    href: "#",
  },
];
export default function FooterSupport() {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold">Support</h2>

      <ul className="flex flex-col items-start gap-4">
        {supportLinks?.map((link) => (
          <li
            key={link.id}
            className="text-sm font-medium text-neutral-500 hover:underline"
          >
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
