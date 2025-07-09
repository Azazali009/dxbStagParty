"use client";

import Image from "next/image";
import Link from "next/link";
import LoadMoreButton from "./LoadMoreButton";
import { useActivity } from "../_context/ActivityProvider";
import { cinzel } from "../layout";

export default function CategoryChunkLayout({ activities }) {
  const { visibleChunks } = useActivity();

  const chunks = [];
  for (let i = 0; i < activities.length; i += 5) {
    chunks.push(activities.slice(i, i + 5));
  }

  return (
    <div className="bg-matalicGold px-4 py-10 sm:px-10 sm:py-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {activities.map((act, index) => {
          return (
            <Link
              href={`/activities/${act.id}`}
              key={act.id}
              className={`relative flex items-end overflow-hidden rounded-xl pb-8 duration-300 hover:scale-95 hover:animate-pulse ${index < 2 ? "h-[500px] 2xl:h-[600px]" : "h-[600px] 2xl:h-[700px]"} ${index === 4 && "!h-[300px] md:col-span-2 lg:-translate-y-[35%] 2xl:!h-[400px] 2xl:-translate-y-[25%]"} ${index > 4 && "!h-[190px] 2xl:!h-[290px]"} `}
            >
              <Image
                src={index > 3 ? act.bannerImage : act.image}
                fill
                alt={act.name}
                className="object-cover object-center"
              />
              {/* overlay */}
              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black"></div>
              <div className="relative z-10 space-y-4 p-4">
                <h2
                  className={`${cinzel.className} text-balance text-2xl font-bold text-secondary`}
                >
                  {act.name}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
