import React from "react";
import { BebasNeue } from "../layout";
import Image from "next/image";
import Link from "next/link";

export default function HomeAndVillaActivities({ ActivitiesArray }) {
  const leftCards = ActivitiesArray.slice(0, 2);
  const rightTop = ActivitiesArray[2];
  const rightBottom = ActivitiesArray.slice(3, 5);
  return (
    <section className="relative space-y-14 bg-primary p-4 py-20">
      <div className="mx-auto max-w-full space-y-6 text-center md:max-w-[70%] lg:max-w-[60%]">
        <div>
          <h2
            className={`${BebasNeue.className} text-3xl uppercase leading-[1.2] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}
          >
            Home & Villa Friendly
          </h2>
          <h3 className="text-sm font-medium xs:text-base md:text-xl">
            Turn Your Crib Into the Main Event
          </h3>
        </div>
        <p className="text-xs leading-[1.8] xs:text-sm md:text-lg">
          Private chefs,cocktail masters, game nights, and more all brought
          straight to you
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 px-8 lg:grid-cols-2">
        {/* column 1 */}

        <div className="space-y-8 [transform:perspective(300px)_rotateY(-2deg)]">
          {leftCards.slice(0, 2).map((activity, index) => {
            return (
              <div
                key={activity.id}
                className={`relative flex h-[250px] sm:h-[400px] md:h-[600px] ${index === 1 && "[transform:perspective(300px)_rotateY(3deg)_rotateZ(-1.5deg)]"} items-end overflow-hidden rounded-xl p-5 sm:p-10`}
              >
                {/* overlay */}
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                <Image
                  src={activity.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={activity.name}
                  className="object-cover"
                />
                <h2 className="relative z-20 text-xl font-medium sm:text-3xl md:text-4xl">
                  {activity.name}
                </h2>
              </div>
            );
          })}
        </div>

        {/* column 2 */}
        <div className="space-y-8 [transform:perspective(500px)_rotateY(-4deg)] lg:-mt-10">
          <div className="relative h-[250px] w-full overflow-hidden rounded-xl sm:h-[400px] md:h-[500px]">
            {/* Background Image */}
            <Image
              src={rightTop.image}
              alt={rightTop.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-black/40" />

            {/* Title */}
            <h2 className="absolute bottom-6 left-6 z-20 text-xl font-medium leading-snug text-white">
              {rightTop.name}
            </h2>
          </div>

          <div className="grid origin-left grid-cols-1 gap-6 [transform:perspective(500px)_rotateY(3deg)_rotateX(3deg)_scale(1.1)] xs:grid-cols-2">
            {rightBottom.slice(0, 2).map((activity, index) => {
              return (
                <div
                  key={activity.id}
                  className={`relative mx-auto flex h-[350px] w-[80%] items-end overflow-hidden rounded-lg p-6 xs:h-[500px] xs:w-full`}
                >
                  {index === 1 && (
                    <p className="absolute left-4 top-4 z-20 rounded-full bg-black px-3 py-2 text-xs sm:text-base md:px-6">
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
                  <h2 className="relative z-20 text-base font-medium leading-[1.5] sm:text-2xl">
                    {activity.name}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="!mt-20 flex flex-col items-center gap-4 sm:mt-0">
        <Link
          href="#"
          className="rounded-lg border-2 border-[#70592f] bg-[#70592f] px-6 py-2 text-sm capitalize duration-300 hover:bg-reddish sm:text-lg"
        >
          see all Villa - Friendly Ideas
        </Link>
        <Link className="text-sm hover:underline sm:text-lg" href={"#"}>
          Or view the full activity list
        </Link>
      </div>
    </section>
  );
}
