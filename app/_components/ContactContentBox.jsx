import React from "react";
import { playfairDisplay } from "../layout";
import Image from "next/image";
import Link from "next/link";
import whiteWhatsapp from "../svgIcons/whiteWhatsapp.svg";
export default function ContactContentBox() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black/20"></div>
      <div className="relative z-10 max-w-[50%] space-y-6">
        <h2
          className={`${playfairDisplay.className} text-5xl font-semibold capitalize`}
        >
          want instant <br /> answers?
        </h2>
        <p className="text-lg leading-[1.6]">
          chat with a stag party expert now on whatsapp
        </p>
        <Link
          className="flex h-10 items-center justify-center gap-2 rounded-md border border-emerald-800 bg-emerald-800 px-6 capitalize duration-300 hover:bg-emerald-950"
          href={"https://wa.me/+971568347487"}
        >
          <Image src={whiteWhatsapp} width={25} height={25} alt="whatsapp" />
          <span>start whatsapp chat</span>
        </Link>
      </div>
    </div>
  );
}
