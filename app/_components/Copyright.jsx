import Image from "next/image";
import React from "react";

export default function Copyright() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-2 text-xs font-medium text-neutral-500 sm:justify-between sm:text-sm">
      <p>&copy;2025 DXB Stag Parties. All rights reserved.</p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={"/images/security.png"}
            width={10}
            height={10}
            alt="security"
            className="grayscale"
          />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>

          <span>Visa &bull; MasterCard</span>
        </div>
      </div>
    </div>
  );
}
