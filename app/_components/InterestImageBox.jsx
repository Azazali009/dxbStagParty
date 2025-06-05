import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function InterestImageBox({ icon, text, url = "#" }) {
  return (
    <Link href={url} className="flex flex-col items-center gap-3">
      <Image className="" src={icon} height={40} width={40} alt="key" />
      <p className="text-center text-xs capitalize xs:text-base">{text}</p>
    </Link>
  );
}
