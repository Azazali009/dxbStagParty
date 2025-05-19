import React from "react";
import {
  getActivities,
  getActivitiesByCategory,
} from "../../../_lib/data-services";
import ActivityCard from "../../../_components/ActivityCard";
import Empty from "../../../_components/Empty";
import { cinzel } from "../../../layout";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;
export async function generateStaticParams() {
  const activities = await getActivities();

  const uniqueCategories = [
    ...new Set(activities.map((curActivity) => String(curActivity.category))),
  ];

  return uniqueCategories.map((category) => ({ category }));
}
export default async function Page({ params }) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const activities = await getActivitiesByCategory(decodedCategory);
  const leftCards = activities.slice(0, 2);
  const rightTop = activities[2];
  const rightBottom = activities.slice(3, 5);

  const categoryImage = activities[0]?.category?.image;
  const categoryName = activities[0]?.category?.name;

  if (!activities.length) return <Empty name={"Activities"} />;
  return (
    <section className="-mt-[170px]">
      <div
        className="relative flex h-[900px] items-center justify-center gap-14 bg-cover bg-no-repeat px-8 py-20"
        style={{
          backgroundImage: `url(${categoryImage})`,
        }}
      >
        {/* overlay */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black/60 to-transparent"></div>
        <h2
          className={`relative z-20 text-9xl font-bold capitalize text-softGold ${cinzel.className} `}
        >
          {categoryName}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-8 px-8 py-28">
        {/* Column 1 */}
        <div className="space-y-6 [transform:perspective(200px)_rotateX(-1deg)]">
          {leftCards.map((activity, index) => (
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
        <div className="-mt-16 space-y-8 [transform:perspective(200px)_rotateX(2deg)]">
          {/* Top big card */}
          {rightTop && (
            <div className="relative flex h-[400px] items-end overflow-hidden rounded-lg p-10">
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
                  href={`/activities/${rightTop?.id}`}
                >
                  Book your slot
                </Link>
              </div>
            </div>
          )}

          {/* Grid 2 cards */}
          <div className="grid origin-center grid-cols-2 gap-6">
            {rightBottom.map((activity, index) => (
              <div
                key={activity.id}
                className={`relative flex h-[500px] items-end overflow-hidden rounded-lg p-6`}
              >
                {index === 1 && (
                  <p className="absolute left-4 top-4 z-20 rounded-full bg-black px-6 py-2">
                    Best for Day Drinking
                  </p>
                )}
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/40"></div>
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
    </section>
  );
}
