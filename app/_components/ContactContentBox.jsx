import React from "react";
import { playfairDisplay } from "../layout";
import Image from "next/image";
import Link from "next/link";
import whiteWhatsapp from "../svgIcons/whiteWhatsapp.svg";
export default function ContactContentBox() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black/20"></div>
      <div className="relative z-10 flex max-w-full flex-col items-center justify-center gap-3 sm:gap-6 xl:max-w-[50%]">
        <h2
          className={`${playfairDisplay.className} text-2xl font-semibold capitalize xs:text-4xl sm:text-5xl`}
        >
          want instant answers?
        </h2>
        <p className="text-xs leading-[1.6] sm:text-lg">
          chat with a stag party expert now on whatsapp
        </p>
        <Link
          className="flex h-8 items-center justify-center gap-1 rounded-md border border-emerald-800 bg-emerald-800 px-4 text-[10px] capitalize duration-300 hover:bg-emerald-950 xs:gap-2 sm:h-10 sm:px-6 sm:text-base"
          href={"https://wa.me/+971568347487"}
        >
          <Image
            src={whiteWhatsapp}
            width={25}
            height={25}
            className="w-3 xs:w-5"
            alt="whatsapp"
          />
          <span>start whatsapp chat</span>
        </Link>
      </div>
    </div>
  );
}
