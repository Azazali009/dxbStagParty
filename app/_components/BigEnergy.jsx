import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BebasNeue } from "../layout";

export default function BigEnergy({ ActivitiesArray }) {
  return (
    <section className="space-y-4 bg-reddish p-4 py-20 xs:space-y-9 sm:space-y-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 xs:gap-4">
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 p-3 sm:p-6 lg:grid-cols-2 lg:gap-12 2xl:gap-20">
        {/* column 1 */}
        <div className="space-y-6">
          {ActivitiesArray.slice(0, 2).map((activity, index) => {
            return (
              <Link
                href={`/activities/${activity.id}`}
                key={activity.id}
                className={`relative flex ${index === 0 ? "h-[200px] origin-top [transform:perspective(300px)_rotateY(-2deg)] xs:h-[450px] sm:h-[650px]" : "h-[200px] [transform:perspective(600px)_rotateY(2deg)_rotateZ(3deg)_scale(1)] xs:h-[350px] sm:h-[500px]"} items-end overflow-hidden rounded-2xl p-5 sm:p-10`}
              >
                {/* overlay */}
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/40"></div>
                <Image
                  src={activity.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <div className="relative flex h-[200px] rotate-12 items-end overflow-hidden rounded-2xl p-5 [transform:perspective(300px)_rotateX(1deg)] sm:h-[400px] sm:p-10">
            {/* overlay */}
            <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
            <Image
              src={"/images/home-hero-bg.webp"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="image"
              className="object-cover"
            />
            <h2 className="absolute left-5 top-5 z-20 rounded-full bg-black px-4 py-2 text-xs capitalize sm:px-6 sm:text-sm">
              staff favourite
            </h2>
          </div>
          <div className="ml-2 grid origin-top grid-cols-1 gap-6 [transform:perspective(400px)_rotateX(1deg)_rotateY(3deg)] xs:grid-cols-2">
            {ActivitiesArray.slice(0, 2).map((activity, index) => {
              return (
                <Link
                  href={`/activities/${activity.id}`}
                  key={activity.id}
                  className={`relative flex items-end overflow-hidden rounded-2xl p-6 ${index === 0 ? "h-[350px] sm:h-[500px]" : "h-[350px] sm:h-[500px]"}`}
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                className="relative !mt-10 block h-[130px] w-full origin-right overflow-visible [transform:perspective(200px)_rotateY(-3deg)_scale(1.1)_translateX(-1%)_rotateZ(2deg)_rotateX(2deg)] xs:h-[170px] sm:!mt-20 sm:h-[250px] sm:[transform:perspective(200px)_rotateY(-3deg)_scale(1.3)_translateX(-1%)_rotateZ(2deg)_rotateX(2deg)] lg:!-mt-0 lg:[transform:perspective(400px)_rotateY(-5deg)_scale(1.17)_rotateZ(-2deg)_rotateX(2deg)]"
              >
                <div className="mt-10 h-full w-full">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <Image
                      src={activity.image}
                      alt={activity.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 to-transparent" />
                    <h2 className="absolute left-6 top-1/2 z-20 -translate-y-1/2 text-lg font-bold leading-snug text-white [transform:perspective(600px)_rotateY(20deg)_rotateX(0deg)] xs:text-2xl sm:text-3xl">
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
