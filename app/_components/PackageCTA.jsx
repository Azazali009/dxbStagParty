import React from "react";
import { BebasNeue } from "../layout";

export default function PackageCTA() {
  return (
    <div className="bg-[#1F1000] px-2 py-14 text-center">
      <div className="flex flex-col items-center justify-center gap-6 xs:gap-8">
        <h1
          className={`${BebasNeue.className} text-5xl font-semibold uppercase text-matalicGold xs:text-6xl sm:text-7xl`}
        >
          ready to rip it?
        </h1>
        <p className="text-sm leading-[1.7] xs:text-lg">
          Lock in the experience of a lifetime or build your full Dubai weekend
          now
        </p>
        <div className="flex items-center gap-3 xs:gap-6">
          <button className="block rounded border-2 border-matalicGold bg-matalicGold px-3 py-2 text-xs capitalize text-[#1F1000] duration-300 hover:bg-transparent hover:text-softGold xs:px-6 xs:py-2.5 xs:text-lg">
            Build my weekend
          </button>
          <button className="block rounded border-2 border-matalicGold bg-transparent px-3 py-2 text-xs capitalize text-softGold duration-300 hover:bg-matalicGold hover:text-[#1F1000] xs:px-6 xs:py-2.5 xs:text-lg">
            chat to concierge
          </button>
        </div>
      </div>
    </div>
  );
}
