import Link from "next/link";
import React from "react";

export default function LoggedInMeesage({ redirectTo = "/login" }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-base leading-[1.8] sm:text-xl">
        Please login
        <Link
          className="px-1 font-medium text-secondary underline hover:no-underline"
          href={redirectTo}
        >
          here to book
        </Link>
        you favourite activity!
      </h2>
    </div>
  );
}
