import Link from "next/link";
import React from "react";

export default function LoggedInMeesage() {
  return (
    <div>
      <p className="leading-[1.8]">
        Please log in
        <Link
          className="px-1 font-medium text-secondary underline hover:no-underline"
          href={"/login"}
        >
          login
        </Link>
        to book you favourite activity and keep smooth booking.
      </p>
    </div>
  );
}
