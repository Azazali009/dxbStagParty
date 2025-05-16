import Image from "next/image";
import Link from "next/link";
import React from "react";
import { playfairDisplay } from "../layout";
import { getActivitiesByCategory } from "../_lib/data-services";

export default async function ChilAndLuxeActivity({ category }) {
  const ActivitiesArray = await getActivitiesByCategory(category);
  const leftCards = ActivitiesArray.slice(0, 2);
  const rightTop = ActivitiesArray[2];
  const rightBottom = ActivitiesArray.slice(3, 5);

  return (
    <section className="relative space-y-14 bg-red-100 p-4 py-20">
      <div className="max-w-[50%] space-y-4 text-navyBlue">
        <h2
          className={`${playfairDisplay.className} text-4xl font-bold capitalize leading-[1.4]`}
        >
          Chill & Luxe &mdash;{" "}
          <span className="font-light">
            Because not everything has to be loud
          </span>
        </h2>
        <p className="leading-[1.8]">
          Balance out of the madness with experience that are stylish,scenic and
          seriously smooth.
        </p>
      </div>
      <div
        className={`h-12 ${playfairDisplay.className} flex w-fit items-center rounded-md bg-[#e5cbcb] px-6 text-lg font-light italic text-[#b29e9e]`}
      >
        <p>Not everything needs a shot and a strobe light</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {/* Column 1 */}
        <div className="space-y-6">
          {leftCards.map((activity, index) => (
            <div
              key={activity.id}
              className={`relative flex ${
                index === 0
                  ? "h-[400px] [transform:perspective(300px)_rotateX(-2deg)]"
                  : "h-[350px] origin-left [transform:perspective(300px)_rotateY(1deg)]"
              } rotate-12 items-end overflow-hidden rounded-lg p-10`}
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
                {" "}
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

        {/* Column 2 */}
        <div className="space-y-8">
          {/* Top big card */}
          <div className="relative flex h-[300px] rotate-12 items-end overflow-hidden rounded-lg p-10 [transform:perspective(300px)_rotateX(2deg)]">
            <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
            <Image
              src={rightTop?.bannerImage}
              fill
              alt={rightTop?.name}
              className="object-cover"
            />
            <h2 className="relative z-20 text-4xl font-medium capitalize">
              {rightTop?.name}
            </h2>
            <div className="group absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center duration-300 hover:bg-navyBlue/60">
              {" "}
              <Link
                className="pointer-events-none invisible translate-y-full rounded-md bg-white px-6 py-2 capitalize text-navyBlue opacity-0 shadow-2xl duration-500 active:translate-y-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                href={`/activities/${rightTop.id}`}
              >
                Book your slot
              </Link>
            </div>
          </div>

          {/* Grid 2 cards */}
          <div className="grid grid-cols-2 gap-6">
            {rightBottom.map((activity, index) => (
              <div
                key={activity.id}
                className={`relative flex h-[400px] items-end overflow-hidden rounded-lg p-6 ${
                  index === 0 && "[transform:perspective(300px)_rotateX(4deg)]"
                }`}
              >
                {index === 1 && (
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
                  {" "}
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
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Link
          href="/activities/category/Chill & Luxe"
          className="rounded-lg bg-[#e5cbcb] px-6 py-2 capitalize text-navyBlue duration-300 hover:bg-reddish hover:text-white"
        >
          explore all chill & luxe
        </Link>
        <Link
          className="text-sm text-navyBlue hover:underline"
          href={"/activities"}
        >
          Or view the full activity list
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 z-50 h-12 w-full bg-red-100"></div>
    </section>
  );
}
