"use client";
import Image from "next/image";
import { BackgroundLines } from "./ui/background-lines";
import image from "../../public/wedding-online-winner.png";
import Button from "../_components/Button";
import AnimatedHeading from "./AnimatedHeading";

export default function PackagesHeroSection() {
  return (
    <BackgroundLines className="flex w-full flex-col items-center justify-center gap-8 border-b border-tertiary">
      <AnimatedHeading>Ready Made Stag Do Packages</AnimatedHeading>
      <p className="mx-auto max-w-xl text-center text-sm text-neutral-700 md:text-lg dark:text-neutral-400">
        Book an epic Stag Party Package, including the top Stag Party
        activities, accommodation, nightlife & ideas to suit all groups & every
        budget.
      </p>
      <div className="relative z-20 flex items-center gap-8">
        <Button>choose your destinations</Button>
        <Button>Search by dates</Button>
      </div>
      <Image
        src={image}
        width={500}
        height={200}
        alt="Reviews"
        placeholder="blur"
      />
    </BackgroundLines>
  );
}
