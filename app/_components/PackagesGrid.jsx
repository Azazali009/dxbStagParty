"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { packages } from "../_lib/packages";
import Link from "next/link";
export default function PackagesGrid() {
  return (
    <div className="mt-14 space-y-14">
      <h3 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent">
        Dubai stag party package
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {packages.map((pack) => {
          return (
            <BackgroundGradient
              key={pack.id}
              className="h-full rounded-[22px] bg-zinc-900 p-4 sm:p-10"
            >
              <h3 className="mb-2 mt-4 text-base text-neutral-200 sm:text-lg">
                {pack.name}
              </h3>

              <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
                {pack.desc}
              </p>
              <Link
                href={"#"}
                className="absolute bottom-4 mt-4 flex items-center space-x-1 rounded-full bg-zinc-800 py-1 pl-4 pr-1 text-xs font-bold"
              >
                <span>Buy now </span>
                <span className="rounded-full bg-zinc-700 px-2 py-0 text-[0.6rem] text-white">
                  $100
                </span>
              </Link>
            </BackgroundGradient>
          );
        })}
      </div>
    </div>
  );
}
