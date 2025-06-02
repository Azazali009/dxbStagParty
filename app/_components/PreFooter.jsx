import React from "react";
import { cinzel } from "../layout";
import Link from "next/link";

export default function PreFooter() {
  return (
    <div className="relative mx-auto flex min-h-full flex-col items-center justify-end bg-[url('/images/cta-bg.webp')] bg-cover bg-no-repeat p-8 sm:min-h-screen">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-navyBlue"></div>
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h1
          className={`${cinzel.className} xs:text-3xl text-xl font-black text-matalicGold sm:text-4xl md:text-5xl lg:text-7xl`}
        >
          Ready to start your <br /> dubai stag adventures?
        </h1>
        <p className="xs:text-xl text-sm">
          Build your weekend. Rally the crew.Lock the memories in.
        </p>
        <button className="block rounded bg-matalicGold px-4 py-2 text-sm capitalize text-navyBlue duration-300 hover:opacity-80 sm:px-6 sm:py-2.5 sm:text-lg">
          start building your weekend
        </button>
        <Link
          href="/packages"
          className="block text-sm capitalize underline hover:no-underline sm:text-lg"
        >
          browse stag packages
        </Link>
      </div>
    </div>
  );
}
