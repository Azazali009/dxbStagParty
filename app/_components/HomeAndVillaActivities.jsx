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
      <div className="mx-auto max-w-[50%] space-y-6 text-center">
        <div>
          <h2
            className={`${BebasNeue.className} text-7xl uppercase leading-[1.2]`}
          >
            Home & Villa Friendly
          </h2>
          <h3 className="text-xl font-medium">
            Turn Your Crib Into the Main Event
          </h3>
        </div>
        <p className="text-lg leading-[1.8]">
          Private chefs,cocktail masters, game nights, and more all brought
          straight to you
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 px-8">
        {/* column 1 */}

        <div className="space-y-8 [transform:perspective(300px)_rotateY(-2deg)]">
          {leftCards.slice(0, 2).map((activity, index) => {
            return (
              <div
                key={activity.id}
                className={`relative flex h-[600px] ${index === 1 && "[transform:perspective(300px)_rotateY(3deg)_rotateZ(-1.5deg)]"} items-end overflow-hidden rounded-xl p-10`}
              >
                {/* overlay */}
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                <Image
                  src={activity.image}
                  fill
                  alt={activity.name}
                  className="object-cover"
                />
                <h2 className="relative z-20 text-4xl font-medium">
                  {activity.name}
                </h2>
              </div>
            );
          })}
        </div>

        {/* column 2 */}
        <div className="-mt-10 space-y-8 [transform:perspective(500px)_rotateY(-4deg)]">
          <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
            {/* Background Image */}
            <Image
              src={rightTop.image}
              alt={rightTop.name}
              fill
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-black/40" />

            {/* Title */}
            <h2 className="absolute bottom-6 left-6 z-20 text-xl font-medium leading-snug text-white">
              {rightTop.name}
            </h2>
          </div>

          <div className="grid origin-left grid-cols-2 gap-6 [transform:perspective(500px)_rotateY(3deg)_rotateX(3deg)_scale(1.1)]">
            {rightBottom.slice(0, 2).map((activity, index) => {
              return (
                <div
                  key={activity.id}
                  className={`relative flex h-[500px] items-end overflow-hidden rounded-lg p-6`}
                >
                  {index === 1 && (
                    <p className="absolute left-4 top-4 z-20 rounded-full bg-black px-6 py-2">
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
                  <h2 className="relative z-20 text-2xl font-medium leading-[1.5]">
                    {activity.name}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Link
          href="#"
          className="rounded-lg border-2 border-[#70592f] bg-[#70592f] px-6 py-2 text-lg capitalize duration-300 hover:bg-reddish"
        >
          see all Villa - Friendly Ideas
        </Link>
        <Link className="text-lg hover:underline" href={"#"}>
          Or view the full activity list
        </Link>
      </div>
    </section>
  );
}
