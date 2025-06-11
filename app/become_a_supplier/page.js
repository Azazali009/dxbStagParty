import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="max-w-4xl space-y-6 p-8">
      <h1 className="text-2xl font-semibold text-matalicGold sm:text-4xl">
        Partner with the Ultimate Stag Brand
      </h1>
      <p className="leading-[1.7]">
        We’re always looking for top-tier experiences, venues, and talent to
        join our stag party network. If you offer something bold, unique, or
        unforgettable — we want to hear from you. Let’s create epic weekends
        together.
      </p>
      <Link
        href={"/become_a_supplier/apply"}
        className="inline-block rounded-md bg-matalicGold px-6 py-2 capitalize text-navyBlue"
      >
        apply now
      </Link>
    </div>
  );
}
