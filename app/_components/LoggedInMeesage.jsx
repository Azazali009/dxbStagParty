import Link from "next/link";
import React from "react";

export default function LoggedInMeesage() {
  return (
    <div className="">
      <p className="leading-[1.8]">
        Please login
        <Link
          className="px-1 font-medium text-secondary underline hover:no-underline"
          href={"/login"}
        >
          here
        </Link>
        to book you favourite activity!
      </p>
    </div>
  );
}
