"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";

export default function HomeStagPartyGrids() {
  return (
    <div className="mx-auto !mt-20 grid max-w-6xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => {
        return (
          <BackgroundGradient
            key={i}
            className="overflow-hidden rounded-[22px] bg-white dark:bg-zinc-900"
          >
            <Image
              src={`/paintball.jpg`}
              alt="jordans"
              height={500}
              width={500}
              className="object-cover"
            />
            <div className="p-4">
              <h3 className="mb-2 mt-4 text-base capitalize text-black sm:text-lg dark:text-neutral-200">
                stag party package
              </h3>
            </div>
          </BackgroundGradient>
        );
      })}
    </div>
  );
}
