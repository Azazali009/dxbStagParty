import Image from "next/image";
import React from "react";

export default function InterestImageBox({ icon, text }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image className="" src={icon} height={40} width={40} alt="key" />
      <p className="xs:text-base text-center text-xs capitalize">{text}</p>
    </div>
  );
}
