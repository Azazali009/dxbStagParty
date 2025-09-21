import Image from "next/image";
import React from "react";
import { cinzel } from "../layout";
import Link from "next/link";
import { cn } from "../_lib/utils";

export default function ActivityRoundCard({
  activity,
  className,
  border = "null",
}) {
  if (!activity) return null;
  const { image, name, slug } = activity;
  return (
    <Link
      href={`/activities/${slug}`}
      className={cn(
        `relative flex items-end ${border !== "null" && border} overflow-hidden rounded-xl object-cover pb-3 duration-300 hover:scale-95 hover:animate-pulse`,
        className,
      )}
    >
      <Image src={image} fill alt={name} className="bg-center object-cover" />
      {/* overlay */}
      <div className="absolute left-0 top-0 block h-full w-full bg-gradient-to-b from-transparent to-black"></div>
      <div className="relative z-10 space-y-4 p-4">
        <h2
          className={`${cinzel.className} text-balance text-xl font-bold text-secondary xs:text-2xl`}
        >
          {name}
        </h2>
      </div>
    </Link>
  );
}
