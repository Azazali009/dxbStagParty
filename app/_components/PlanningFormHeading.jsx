import React from "react";
import { cinzel } from "../layout";

export default function PlanningFormHeading() {
  return (
    <div>
      <h1
        className={`${cinzel.className} text-2xl font-bold text-matalicGold sm:text-3xl lg:text-5xl`}
      >
        Build you own weekend
      </h1>
      <p className="text-neutral-500">
        Design your perfect weekend just the way you like it — from relaxing
        getaways to thrilling adventures, it&apos;s your time, your rules.
      </p>
    </div>
  );
}
