"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Georgia } from "../layout";
import { useActivity } from "../_context/ActivityProvider";

export default function ChilAndLuxeActivity({ category }) {
  const { filteredActivities } = useActivity();

  const filteredByCategoryArr = filteredActivities.filter(
    (activity) => activity?.category?.name === category,
  );

  if (!filteredByCategoryArr.length) return null;

  return (
    <section className="relative space-y-6 bg-red-100 p-4 py-10 sm:space-y-14 sm:py-20">
      <div className="space-y-2 text-navyBlue sm:space-y-4">
        <h2
          className={`${Georgia.className} text-xl font-bold capitalize leading-[1.4] xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl`}
        >
          Chill & Luxe &mdash;{" "}
          <span className="font-light">
            Because not <br /> everything has to be loud
          </span>
        </h2>
        <p className="text-[9px] leading-[1.8] xs:text-xs sm:text-base">
          Balance out the madness with experiences that are stylish, scenic, and
          seriously smooth.
        </p>
      </div>

      <div
        className={`h-12 ${Georgia.className} flex w-full items-center rounded-md bg-[#e5cbcb] px-3 text-xs font-light italic text-[#766868] xs:text-sm sm:px-6 sm:text-lg md:w-[60%] lg:w-[50%]`}
      >
        <p>Not everything needs a shot and a strobe light</p>
      </div>

      <div className="!mt-10 grid grid-cols-1 gap-4 px-4 sm:mt-0 sm:gap-8 sm:px-8 lg:grid-cols-2">
        {/* Column 1 (Left) */}
        <div className="space-y-6 [transform:perspective(200px)_rotateX(-1deg)]">
          {filteredByCategoryArr.map((activity, index) => {
            if (index === 0 || index === 1) {
              return (
                <div
                  key={activity.id}
                  className={`relative flex ${
                    index === 0
                      ? "h-[200px] xs:h-[300px] sm:h-[400px] lg:h-[500px]"
                      : "h-[200px] xs:h-[250px] sm:h-[350px] lg:h-[450px]"
                  } items-end overflow-hidden rounded-lg p-4 xs:p-10`}
                >
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                  <Image
                    src={activity.bannerImage}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={activity.name}
                    className="object-cover"
                  />
                  <h2 className="relative z-20 text-base font-medium xs:text-2xl sm:text-3xl md:text-4xl">
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
              );
            }
            return null;
          })}
        </div>

        {/* Column 2 (Right) */}
        <div className="!-mt-[2rem] space-y-8 [transform:perspective(200px)_rotateX(2deg)] lg:!-mt-[4rem]">
          {/* Top big card at index 2 */}
          {filteredByCategoryArr[2] && (
            <div
              key={filteredByCategoryArr[2].id}
              className="relative flex h-[250px] items-end overflow-hidden rounded-lg p-4 xs:h-[300px] xs:p-10 sm:h-[400px]"
            >
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
              <Image
                src={filteredByCategoryArr[2].bannerImage}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={filteredByCategoryArr[2].name}
                className="object-cover"
              />
              <h2 className="relative z-20 text-base font-medium capitalize xs:text-2xl sm:text-3xl md:text-4xl">
                {filteredByCategoryArr[2].name}
              </h2>
              <div className="group absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center duration-300 hover:bg-navyBlue/60">
                <Link
                  className="pointer-events-none invisible translate-y-full rounded-md bg-white px-6 py-2 capitalize text-navyBlue opacity-0 shadow-2xl duration-500 active:translate-y-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                  href={`/activities/${filteredByCategoryArr[2].id}`}
                >
                  Book your slot
                </Link>
              </div>
            </div>
          )}

          {/* Grid of bottom-right two cards: index 3 & 4 */}
          <div className="grid origin-center grid-cols-1 gap-6 xs:grid-cols-2">
            {filteredByCategoryArr.map((activity, index) => {
              if (index === 3 || index === 4) {
                return (
                  <div
                    key={activity.id}
                    className="relative flex h-[350px] items-end overflow-hidden rounded-lg p-3 sm:h-[500px] md:p-6"
                  >
                    {index === 4 && (
                      <p className="absolute left-4 top-4 z-20 rounded-full bg-black px-3 py-2 text-xs md:px-6 md:text-base">
                        Best for Day Drinking
                      </p>
                    )}
                    <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                    <Image
                      src={activity.image}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={activity.name}
                      className="object-cover"
                    />
                    <h2 className="relative z-20 text-base font-medium leading-[1.5] xs:text-lg md:text-xl">
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
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      {filteredByCategoryArr.length >= 5 && (
        <div className="!mt-32 flex flex-col items-center gap-2 xs:!mt-20 sm:gap-4">
          <Link
            href={`/activities/category/${filteredByCategoryArr[0]?.category?.name}`}
            className="rounded-lg border-2 border-[#70592f] bg-[#70592f] px-6 py-2 text-sm capitalize duration-300 hover:bg-reddish sm:text-lg"
          >
            explore all chill & luxe
          </Link>
          <Link
            className="text-sm text-navyBlue hover:underline sm:text-lg"
            href={"/activities"}
          >
            Or view the full activity list
          </Link>
        </div>
      )}
    </section>
  );
}
