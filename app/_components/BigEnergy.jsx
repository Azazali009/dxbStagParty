import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BebasNeue } from "../layout";

export default function BigEnergy({ ActivitiesArray }) {
  return (
    <section className="space-y-4 bg-reddish p-4 py-20 xs:space-y-9 sm:space-y-14">
      <div className="flex flex-col gap-2 xs:gap-4">
        <h2
          className={`text-left text-2xl xs:text-3xl sm:text-5xl ${BebasNeue.className} font-medium uppercase`}
        >
          big energy day to night &mdash;{" "}
          <span className="capitalize">
            dubai&apos;s ultimate party line-up{" "}
          </span>{" "}
        </h2>
        <p className="text-xs xs:text-base">
          From rooftop pools to bottle-service bangers, this is where the real
          party starts
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 p-3 sm:p-6 lg:grid-cols-2">
        {/* column 1 */}
        <div className="space-y-6">
          {ActivitiesArray.slice(0, 2).map((activity, index) => {
            return (
              <Link
                href={`/activities/${activity.id}`}
                key={activity.id}
                className={`relative flex ${index === 0 ? "h-[200px] [transform:perspective(300px)_rotateY(-2deg)] xs:h-[350px] sm:h-[500px]" : "h-[200px] origin-left [transform:perspective(800px)_rotateY(3deg)] xs:h-[250px] sm:h-[450px]"} rotate-12 items-end overflow-hidden rounded-lg p-5 sm:p-10`}
              >
                {/* overlay */}
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/40"></div>
                <Image
                  src={activity.image}
                  fill
                  alt={activity.name}
                  className="object-cover"
                />
                <h2 className="relative z-20 text-lg font-medium xs:text-2xl sm:text-3xl">
                  {activity.name}
                </h2>
              </Link>
            );
          })}
        </div>

        {/* column 2 */}
        <div className="space-y-8">
          <div className="relative flex h-[200px] rotate-12 items-end overflow-hidden rounded-lg p-5 [transform:perspective(300px)_rotateX(2deg)] sm:h-[300px] sm:p-10">
            {/* overlay */}
            <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
            <Image
              src={"/images/home-hero-bg.webp"}
              fill
              alt="image"
              className="object-cover"
            />
            <h2 className="absolute left-5 top-5 z-20 rounded-full bg-black px-4 py-2 text-xs capitalize sm:px-6 sm:text-sm">
              staff favourite
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 xs:grid-cols-2">
            {ActivitiesArray.slice(0, 2).map((activity, index) => {
              return (
                <Link
                  href={`/activities/${activity.id}`}
                  key={activity.id}
                  className="relative flex h-[350px] items-end overflow-hidden rounded-lg p-6 [transform:perspective(300px)_rotateX(1.5deg)_rotateY(-2deg)] sm:h-[500px]"
                >
                  {index === 1 && (
                    <p className="absolute left-4 top-4 z-20 rounded-full bg-black px-2 py-2 text-[9px] xs:px-4 sm:px-6 sm:text-base">
                      Best for Day Drinking
                    </p>
                  )}
                  {/* overlay */}
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                  <Image
                    src={activity.image}
                    fill
                    alt={activity.name}
                    className="object-cover"
                  />
                  <h2 className="relative z-20 text-lg font-medium leading-[1.5] xs:text-2xl sm:text-2xl">
                    {activity.name}
                  </h2>
                </Link>
              );
            })}
          </div>
          {/* 3 */}
          {ActivitiesArray.slice(0, 1).map((activity) => {
            return (
              <Link
                href={`/activities/${activity.id}`}
                key={activity.id}
                className="relative !mt-10 block h-[130px] w-full origin-right overflow-visible [transform:perspective(200px)_rotateY(-3deg)_scale(1.1)_translateX(-1%)_rotateZ(2deg)] xs:h-[170px] sm:!mt-20 sm:h-[250px] sm:[transform:perspective(200px)_rotateY(-3deg)_scale(1.3)_translateX(-1%)_rotateZ(2deg)] lg:!mt-16 lg:[transform:perspective(200px)_rotateY(-5deg)_scale(1.4)_translateX(-1%)_rotateZ(4deg)]"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="mt-10 h-full w-full">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <Image
                      src={activity.image}
                      alt={activity.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 to-transparent" />
                    <h2 className="absolute left-6 top-1/2 z-20 -translate-y-1/2 text-lg font-bold leading-snug text-white xs:text-2xl sm:text-3xl">
                      {activity.name}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <button className="rounded-lg border-2 border-[#70592f] bg-[#70592f] px-6 py-2 text-sm capitalize duration-300 hover:bg-reddish sm:text-lg">
          explore all party experience
        </button>
      </div>
    </section>
  );
}
