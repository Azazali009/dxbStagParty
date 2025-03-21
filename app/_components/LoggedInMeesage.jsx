import Link from "next/link";
import React from "react";

export default function LoggedInMeesage() {
  return (
    <div>
      <p className="font-light leading-[1.8] text-secondary">
        Please log in
        <Link className="px-1 font-medium text-white underline" href={"/login"}>
          login
        </Link>
        to book you favourite activity and keep smooth booking.
      </p>
    </div>
  );
}
