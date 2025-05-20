"use client";

import Image from "next/image";
import Link from "next/link";
import LoadMoreButton from "./LoadMoreButton";
import { useActivity } from "../_context/ActivityProvider";

export default function CategoryChunkLayout({ activities }) {
  const { visibleChunks } = useActivity();

  const chunks = [];
  for (let i = 0; i < activities.length; i += 5) {
    chunks.push(activities.slice(i, i + 5));
  }

  return (
    <>
      {chunks.slice(0, visibleChunks).map((chunk, chunkIndex) => {
        const leftCards = chunk.slice(0, 2);
        const rightTop = chunk[2];
        const rightBottom = chunk.slice(3, 5);

        return (
          <div
            key={chunkIndex}
            className={`grid grid-cols-2 gap-8 px-8 ${
              chunkIndex === 0 ? "pb-16 pt-28" : "pb-12 pt-0"
            }`}
          >
            {/* Left Column */}
            <div className="space-y-6 [transform:perspective(200px)_rotateX(-1deg)]">
              {leftCards.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`relative flex ${
                    index === 0 ? "h-[500px]" : "h-[450px]"
                  } items-end overflow-hidden rounded-lg p-10`}
                >
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20" />
                  <Image
                    src={activity.bannerImage}
                    fill
                    alt={activity.name}
                    className="object-cover"
                  />
                  <h2 className="relative z-20 text-4xl font-medium">
                    {activity.name}
                  </h2>
                  <div className="group absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center duration-300 hover:bg-navyBlue/60">
                    <Link
                      className="pointer-events-none invisible translate-y-full rounded-md bg-white px-6 py-2 capitalize text-navyBlue opacity-0 shadow-2xl duration-500 active:translate-y-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                      href={`/activities/${activity.id}`}
                    >
                      Book your slot
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="-mt-16 space-y-8 [transform:perspective(200px)_rotateX(2deg)]">
              {/* Top Banner */}
              {rightTop && (
                <div className="relative flex h-[400px] items-end overflow-hidden rounded-lg p-10">
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20" />
                  <Image
                    src={rightTop.bannerImage}
                    fill
                    alt={rightTop.name}
                    className="object-cover"
                  />
                  <h2 className="relative z-20 text-4xl font-medium capitalize">
                    {rightTop.name}
                  </h2>
                  <div className="group absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center duration-300 hover:bg-navyBlue/60">
                    <Link
                      className="pointer-events-none invisible translate-y-full rounded-md bg-white px-6 py-2 capitalize text-navyBlue opacity-0 shadow-2xl duration-500 active:translate-y-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                      href={`/activities/${rightTop.id}`}
                    >
                      Book your slot
                    </Link>
                  </div>
                </div>
              )}

              {/* Grid Bottom */}
              {rightBottom.length > 0 && (
                <div className="grid origin-center grid-cols-2 gap-6">
                  {rightBottom.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="relative flex h-[500px] items-end overflow-hidden rounded-lg p-6"
                    >
                      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/40" />
                      <Image
                        src={activity.image}
                        fill
                        alt={activity.name}
                        className="object-cover"
                      />
                      <h2 className="relative z-20 text-2xl font-medium leading-[1.5]">
                        {activity.name}
                      </h2>
                      <div className="group absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center duration-300 hover:bg-navyBlue/60">
                        <Link
                          className="pointer-events-none invisible translate-y-full rounded-md bg-white px-6 py-2 capitalize text-navyBlue opacity-0 shadow-2xl duration-500 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                          href={`/activities/${activity.id}`}
                        >
                          Book your slot
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* ✅ ONE Load More button below all */}
      <LoadMoreButton totalChunks={chunks.length} />
    </>
  );
}
