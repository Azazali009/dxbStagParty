import React from "react";
import { cinzel } from "../layout";
import Link from "next/link";

export default function PreFooter() {
  return (
    <div className="relative mx-auto flex min-h-full flex-col items-center justify-end bg-[url('/images/cta-bg.webp')] bg-cover bg-no-repeat p-4 py-8 xs:p-8 xs:py-8 sm:min-h-screen">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#362A23]/80 to-navyBlue/30"></div>
      <div className="relative z-10 flex flex-col items-center gap-3 text-center sm:gap-6">
        <h1
          className={`${cinzel.className} text-xl font-black text-matalicGold xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl`}
        >
          Ready to start your <br /> Dubai stag adventures?
        </h1>
        <p className="text-sm xs:text-xl">
          Build your weekend. Rally the crew. Lock the memories in.
        </p>
        <Link
          href={"/builder"}
          className="block rounded bg-matalicGold px-4 py-2 text-xs capitalize text-navyBlue duration-300 hover:opacity-80 xs:text-sm sm:px-6 sm:py-2.5 sm:text-lg"
        >
          Start Planning Your Stag Party
        </Link>
        <Link
          href="/packages"
          className="block text-xs capitalize underline hover:no-underline xs:text-sm sm:text-lg"
        >
          browse stag packages
        </Link>
      </div>
    </div>
  );
}
