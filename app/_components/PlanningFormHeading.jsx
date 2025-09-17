import React from "react";
import { cinzel } from "../layout";

export default function PlanningFormHeading() {
  return (
    <div className="space-y-2">
      <h1
        className={`${cinzel.className} text-lg font-bold leading-[1.1] text-matalicGold sm:text-3xl lg:text-5xl`}
      >
        Build you own weekend
      </h1>
      <p className="text-xs text-neutral-500 sm:text-base">
        Design your perfect weekend just the way you like it — from relaxing
        getaways to thrilling adventures, it&apos;s your time, your rules.
      </p>
    </div>
  );
}
