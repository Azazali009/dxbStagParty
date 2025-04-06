import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "./LinkButton";

export default function PackageCard({ pack }) {
  return (
    <div
      key={pack.id}
      className="flex h-full flex-col items-start gap-4 rounded-[22px] border-2 border-secondary bg-white p-4 text-neutral-700 shadow-md sm:p-10"
    >
      <h3 className="mb-2 mt-4 text-balance leading-[1.5]">{pack.name}</h3>
      {/* Image */}
      <Image
        src={pack?.image}
        alt={pack?.name}
        width={500}
        className="rounded"
        height={500}
      />
      {/* blurb */}
      <div className="space-x-2 text-sm">
        <span>{pack?.blurb}</span>
      </div>

      <div className="space-x-2 text-sm">
        <strong className="text-secondary">Group Size:</strong>{" "}
        <span>{pack?.group_size} Guests</span>
      </div>

      {/* inclusions */}
      <div className="space-x-2 text-sm">
        <strong className="text-secondary">Inclusions:</strong>{" "}
        <span>{pack?.inclusions?.join(", ")}</span>
      </div>

      <LinkButton
        href={`/packages/${pack.id}`}
        className={"flex items-center gap-2"}
      >
        <span>Buy now</span>
        <span className="rounded-full bg-gray-200 px-1 text-sm">
          {pack?.price_band}
        </span>
      </LinkButton>
    </div>
  );
}
