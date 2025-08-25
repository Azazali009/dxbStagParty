import Link from "next/link";
import React from "react";

const buildLinks = [
  {
    id: 5000,
    text: "Build My Stag Party",
    href: "/builder",
  },
  {
    id: 5001,
    text: "How it works",
    href: "#",
  },
  {
    id: 5002,
    text: "All Activities",
    href: "/activities/all",
  },
  {
    id: 5003,
    text: "Packages",
    href: "/packages",
  },
  {
    id: 5004,
    text: "Content Hub",
    href: "#",
  },
  {
    id: 5005,
    text: "Need it handled? Request a concierge",
    href: "#",
  },
];
export default function FooterBuildLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold">Build</h2>
      <ul className="space-y-4">
        {buildLinks?.map((link) => (
          <li
            className="text-sm font-medium text-neutral-500 hover:underline"
            key={link.id}
          >
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
