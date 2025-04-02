import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import Link from "next/link";

export default function PackageCard({ pack }) {
  return (
    <BackgroundGradient
      key={pack.id}
      className="flex h-full flex-col items-start gap-4 rounded-[22px] bg-zinc-900 p-4 sm:p-10"
    >
      <h3 className="mb-2 mt-4 text-balance leading-[1.5] text-neutral-200">
        {pack.name}
      </h3>
      {/* Image */}
      <Image src={pack?.image} alt={pack?.name} width={500} height={500} />
      {/* blurb */}
      <div className="space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
        <span>{pack?.blurb}</span>
      </div>
      {/* tags */}
      {/* <div className="space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
        <strong className="text-secondary">Tags:</strong>{" "}
        <span>{pack?.tags?.join(", ")}</span>
      </div> */}
      {/* group size */}
      <div className="space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
        <strong className="text-secondary">Group Size:</strong>{" "}
        <span>{pack?.group_size} peoples</span>
      </div>

      {/* inclusions */}
      <div className="space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
        <strong className="text-secondary">Inclusions:</strong>{" "}
        <span>{pack?.inclusions?.join(", ")} peoples</span>
      </div>

      <Link
        href={`/packages/${pack.id}`}
        className="mt-auto flex items-center space-x-1 rounded-full bg-primary px-4 py-1 text-xs font-semibold shadow-shadowOne duration-300 hover:bg-transparent"
      >
        <span>Buy now</span>
        <span className="rounded-full bg-tertiary px-1">
          {pack?.price_band}
        </span>
      </Link>
    </BackgroundGradient>
  );
}
