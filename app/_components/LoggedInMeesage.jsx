import Link from "next/link";
import React from "react";

export default function LoggedInMeesage({ redirectTo = "/login" }) {
  return (
    <div className="p-6 text-center">
      <p className="leading-[1.8]">
        Please login
        <Link
          className="px-1 font-medium text-secondary underline hover:no-underline"
          href={redirectTo}
        >
          here to book
        </Link>
        you favourite activity!
      </p>
    </div>
  );
}
