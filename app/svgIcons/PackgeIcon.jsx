import Image from "next/image";
import React from "react";
import packageIcon from "./package.png";
export default function PackgeIcon() {
  return <Image src={packageIcon} width={20} height={20} alt="package" />;
}
