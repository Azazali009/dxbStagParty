import React from "react";
import { BebasNeue } from "../layout";

export default function SingleActivityCta() {
  return (
    <div className="bg-[#1F1000] py-14">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1
          className={`${BebasNeue.className} text-7xl font-semibold uppercase text-matalicGold`}
        >
          ready to rip it?
        </h1>
        <p className="text-lg leading-[1.7]">
          Lock in the experience of a lifetime or build your full Dubai weekend
          now
        </p>
        <div className="flex items-center gap-6">
          <button className="block rounded border-2 border-matalicGold bg-matalicGold px-6 py-2.5 text-lg capitalize text-[#1F1000] duration-300 hover:bg-transparent hover:text-softGold">
            Build my weekend
          </button>
          <button className="block rounded border-2 border-matalicGold bg-transparent px-6 py-2.5 text-lg capitalize text-softGold duration-300 hover:bg-matalicGold hover:text-[#1F1000]">
            chat to concierge
          </button>
        </div>
      </div>
    </div>
  );
}
