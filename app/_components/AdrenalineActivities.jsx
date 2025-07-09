"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useActivity } from "../_context/ActivityProvider";
import ActivityCard from "./ActivityCard";
import ActivityRoundCard from "./ActivityRoundCard";
import { cinzel } from "../layout";
import LinkButton from "./LinkButton";
export default function AdrenalineActivities({ category }) {
  const { filteredActivities } = useActivity();

  const filteredByCategoryArr = filteredActivities.filter(
    (activity) => activity?.category?.name === category,
  );

  if (!filteredByCategoryArr.length) return null;
  return (
    <section className="bg-[url('/images/adrenaline-bg.webp')] bg-cover bg-no-repeat py-10 pb-10 sm:py-20">
      <div className="space-y-10 px-4 sm:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center sm:gap-4">
          <h2 className="text-3xl font-semibold uppercase xs:text-4xl sm:text-5xl">
            adrenaline hits
          </h2>
          <p className="text-xs xs:text-sm sm:text-base">
            Thrills that will make your stag legendary
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {filteredByCategoryArr?.slice(0, 7)?.map((act, index) => {
            return (
              <Link
                href={`/activities/${act.id}`}
                key={act.id}
                className={`relative flex items-end overflow-hidden rounded-xl pb-8 duration-300 hover:scale-95 hover:animate-pulse ${index < 2 ? "h-[500px] 2xl:h-[600px]" : "h-[600px] 2xl:h-[700px]"} ${index === 4 && "!h-[300px] md:col-span-2 lg:-translate-y-[35%] 2xl:!h-[400px] 2xl:-translate-y-[25%]"} ${index > 4 && "!h-[190px] 2xl:!h-[290px]"} `}
              >
                <Image
                  src={index > 3 ? act.bannerImage : act.image}
                  fill
                  alt={act.name}
                  className="object-cover object-center"
                />
                {/* overlay */}
                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black"></div>
                <div className="relative z-10 space-y-4 p-4">
                  <h2
                    className={`${cinzel.className} text-balance text-2xl font-bold text-secondary`}
                  >
                    {act.name}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center lg:-translate-y-[100%]">
          <LinkButton
            className={
              "bg-matalicGold text-primary duration-300 hover:scale-90"
            }
            href={"/activities/category/Adrenaline"}
          >
            Explore more adrenaline
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
