"use client";

import { useState } from "react";

export default function ViewRoles() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-block rounded bg-matalicGold px-2 py-2 text-left text-sm capitalize text-navyBlue outline-none"
      >
        View Open Roles
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-10 mt-1 w-fit rounded bg-navyBlue p-4 text-sm shadow-lg">
          <li className="px-4 py-2 hover:bg-gray-600">
            <a href="/signup">Are you a party organiser?</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-600">
            <a href="/become_a_supplier">A venue or party supplier?</a>
          </li>
        </ul>
      )}
    </div>
  );
}
