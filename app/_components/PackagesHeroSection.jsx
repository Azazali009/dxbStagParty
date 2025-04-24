"use client";
import Image from "next/image";
import { BackgroundLines } from "./ui/background-lines";
import Button from "../_components/Button";
import AnimatedHeading from "./AnimatedHeading";

export default function PackagesHeroSection() {
  return (
    <BackgroundLines className="border-tertiary/40 relative -z-10 flex w-full flex-col items-center justify-center gap-8 border-b py-8">
      <AnimatedHeading>Ready Made Stag Do Packages</AnimatedHeading>
      <p className="mx-auto max-w-xl text-center text-sm text-neutral-400 md:text-lg">
        Book an epic Stag Party Package, including the top Stag Party
        activities, accommodation, nightlife & ideas to suit all groups & every
        budget.
      </p>
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-2 sm:gap-8">
        <Button>choose your destinations</Button>
        <Button>Search by dates</Button>
      </div>
    </BackgroundLines>
  );
}
