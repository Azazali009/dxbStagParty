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
    <section className="relative space-y-14 bg-red-100 p-4 py-20">
      <div className="space-y-4 text-navyBlue">
        <h2
          className={`${Georgia.className} text-6xl font-bold capitalize leading-[1.4]`}
        >
          Chill & Luxe &mdash;{" "}
          <span className="font-light">
            Because not <br /> everything has to be loud
          </span>
        </h2>
        <p className="leading-[1.8]">
          Balance out the madness with experiences that are stylish, scenic, and
          seriously smooth.
        </p>
      </div>

      <div
        className={`h-12 ${Georgia.className} flex w-[50%] items-center rounded-md bg-[#e5cbcb] px-6 text-lg font-light italic text-[#766868]`}
      >
        <p>Not everything needs a shot and a strobe light</p>
      </div>

      <div className="grid grid-cols-2 gap-8 px-8">
        {/* Column 1 (Left) */}
        <div className="space-y-6 [transform:perspective(200px)_rotateX(-1deg)]">
          {filteredByCategoryArr.map((activity, index) => {
            if (index === 0 || index === 1) {
              return (
                <div
                  key={activity.id}
                  className={`relative flex ${
                    index === 0 ? "h-[500px]" : "h-[450px]"
                  } items-end overflow-hidden rounded-lg p-10`}
                >
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
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
              );
            }
            return null;
          })}
        </div>

        {/* Column 2 (Right) */}
        <div className="-mt-16 space-y-8 [transform:perspective(200px)_rotateX(2deg)]">
          {/* Top big card at index 2 */}
          {filteredByCategoryArr[2] && (
            <div
              key={filteredByCategoryArr[2].id}
              className="relative flex h-[400px] items-end overflow-hidden rounded-lg p-10"
            >
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
              <Image
                src={filteredByCategoryArr[2].bannerImage}
                fill
                alt={filteredByCategoryArr[2].name}
                className="object-cover"
              />
              <h2 className="relative z-20 text-4xl font-medium capitalize">
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
          <div className="grid origin-center grid-cols-2 gap-6">
            {filteredByCategoryArr.map((activity, index) => {
              if (index === 3 || index === 4) {
                return (
                  <div
                    key={activity.id}
                    className="relative flex h-[500px] items-end overflow-hidden rounded-lg p-6"
                  >
                    {index === 4 && (
                      <p className="absolute left-4 top-4 z-20 rounded-full bg-black px-6 py-2">
                        Best for Day Drinking
                      </p>
                    )}
                    <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
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
        <div className="mt-12 flex flex-col items-center gap-4">
          <Link
            href={`/activities/category/${filteredByCategoryArr[0]?.category?.name}`}
            className="rounded-lg border-2 border-[#70592f] bg-[#70592f] px-6 py-2 text-lg capitalize duration-300 hover:bg-reddish"
          >
            explore all chill & luxe
          </Link>
          <Link
            className="text-lg text-navyBlue hover:underline"
            href={"/activities"}
          >
            Or view the full activity list
          </Link>
        </div>
      )}
    </section>
  );
}
