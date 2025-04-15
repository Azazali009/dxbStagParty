import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HomeWhatsAppButton() {
  return (
    <div className="max-w-5xl p-8">
      <Link
        href={"https://wa.me/+971568347487"}
        className="bg-navyBlue border-softGold/20 flex w-fit items-center gap-4 rounded-lg border px-6 py-3 duration-300 hover:scale-95 hover:shadow-xl"
      >
        <Image
          src={"/images/wpIcon.png"}
          width={25}
          height={25}
          alt="whatsapp"
        />
        <span>Message us on whatsapp</span>
      </Link>
    </div>
  );
}
