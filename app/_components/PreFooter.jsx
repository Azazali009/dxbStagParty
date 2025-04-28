import React from "react";
import { cinzel } from "../layout";

export default function PreFooter() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-end bg-[url('/images/cta-bg.webp')] bg-cover bg-no-repeat p-8">
      <div className="absolute -top-6 left-0 z-20 h-10 w-full bg-primary blur-md"></div>
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-navyBlue"></div>
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h1
          className={`${cinzel.className} text-4xl font-bold text-matalicGold`}
        >
          Ready to start your <br /> dubai stag adventures?
        </h1>
        <p className="text-lg">
          Build your weekend. Rally the crew.Lock the memories in.
        </p>
        <button className="block rounded-md bg-matalicGold px-6 py-2.5 capitalize text-navyBlue duration-300 hover:opacity-80">
          start building your weekend
        </button>
        <button className="block">browse stag packages</button>
      </div>
    </div>
  );
}
