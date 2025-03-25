"use client";
import React, { useState } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
// import { packages } from "../_lib/packages";
import { allPackages } from "../_lib/packagesData";

export default function PackagesGrid() {
  const [filter, setFilter] = useState("all");

  const uniqueKeywords = [
    "all",
    ...new Set(allPackages.map((pack) => pack.keyword)),
  ];
  const filteredPackages =
    filter === "all"
      ? allPackages
      : allPackages.filter((pkg) => pkg.keyword === filter);
  return (
    <div className="mt-14 space-y-14">
      <h3 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent">
        Dubai stag party packages &mdash; Filter by choice
      </h3>
      <ul className="scrollbar-hide tab-design mx-auto flex w-full max-w-5xl justify-center gap-4 overflow-x-auto whitespace-nowrap">
        {uniqueKeywords.map((keyword) => (
          <li key={keyword}>
            <button
              onClick={() => setFilter(keyword)}
              className={`flex w-full min-w-max justify-center rounded-full border-2 border-secondary px-6 py-2 text-sm capitalize transition-all duration-300 ${filter === keyword ? "bg-secondary" : "bg-transparent"} hover:bg-secondary`}
              href={"/activities"}
            >
              {keyword.split("-").join(" ")}
            </button>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPackages.map((pack) => {
          return (
            <BackgroundGradient
              key={pack.id}
              className="flex h-full flex-col items-start gap-4 rounded-[22px] bg-zinc-900 p-4 sm:p-10"
            >
              <h3 className="mb-2 mt-4 text-balance leading-[1.5] text-neutral-200">
                {pack.title}
              </h3>

              <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>

              <button
                href={"#"}
                className="mt-auto flex items-center space-x-1 rounded-full bg-primary px-4 py-1 text-xs font-bold shadow-shadowOne"
              >
                Buy now
                {/* <span>Buy now </span> */}
                {/* <span className="rounded-full bg-zinc-700 px-2 py-0 text-[0.6rem] text-white">
                  $100
                </span> */}
              </button>
            </BackgroundGradient>
          );
        })}
      </div>
    </div>
  );
}
