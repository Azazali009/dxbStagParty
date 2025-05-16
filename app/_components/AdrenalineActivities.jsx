import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getActivitiesByCategory } from "../_lib/data-services";

export default async function AdrenalineActivities({ category }) {
  const ActivitiesArray = await getActivitiesByCategory(category);
  const tildCard = ActivitiesArray[0];

  return (
    <section className="bg-[#694621] py-20">
      <div className="mx-auto w-[95%]">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-semibold uppercase">adrenaline hits</h2>
          <p>Thrills that will make your stag legendary</p>
        </div>
        <div className="!mt-20 grid grid-cols-[1fr_0.9fr_1fr] items-start gap-x-12">
          {/* card 1 */}
          {ActivitiesArray.slice(0, 3).map((activity, index) => {
            return (
              <div
                key={activity.id}
                className={`relative flex origin-top items-end overflow-hidden rounded-lg p-10 [transform:perspective(300px)_rotateY(-5deg)] ${
                  index === 1
                    ? "z-10 h-[650px]"
                    : index === 2
                      ? "h-[700px]"
                      : "h-[550px]"
                }`}
              >
                {/* overlay */}
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
                {/* book button */}
                <div className="group absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center duration-300 hover:bg-navyBlue/60">
                  {" "}
                  <Link
                    className="pointer-events-none invisible translate-y-full rounded-md bg-white px-6 py-2 capitalize text-navyBlue opacity-0 shadow-2xl duration-500 active:translate-y-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                    href={`/activities/${activity.id}`}
                  >
                    Book your slot
                  </Link>
                </div>
                <Image
                  src={activity.image}
                  fill
                  alt={activity.name}
                  className="object-cover"
                />
                <h2 className="relative z-20 text-xl font-medium">
                  {activity.name}
                </h2>
              </div>
            );
          })}

          <div className="relative col-span-2 flex h-[400px] -translate-y-[15%] !rotate-[8deg] items-end overflow-hidden rounded-lg p-6">
            {/* titl design */}
            <div className="absolute right-0 top-0 z-20 h-6 w-[50%] rounded-b-3xl rounded-r-none bg-[#694621]"></div>
            {/* overlay */}
            <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
            <Image
              src={tildCard.bannerImage}
              fill
              alt="image"
              className="object-cover"
            />
            <h2 className="relative z-10 text-4xl font-medium">
              {tildCard.name}
            </h2>
            {/* book button */}
            <div className="group absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center duration-300 hover:bg-navyBlue/60">
              {" "}
              <Link
                className="pointer-events-none invisible translate-y-full rounded-md bg-white px-6 py-2 capitalize text-navyBlue opacity-0 shadow-2xl duration-500 active:translate-y-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                href={`/activities/${tildCard.id}`}
              >
                Book your slot
              </Link>
            </div>
          </div>
          {/* card 5 */}
          <div className="flex flex-col gap-6 self-center">
            <Link
              href={`/activities/category/adrenaline`}
              className="flex items-center rounded-2xl bg-orange-700 p-6 text-2xl font-medium capitalize"
            >
              explore all adrenaline activities
            </Link>
            <p className="text-xl">or browse all 60+ stag activities</p>
          </div>
        </div>
      </div>
    </section>
  );
}
