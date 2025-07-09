"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useActivity } from "../_context/ActivityProvider";
import ActivityCard from "./ActivityCard";
import ActivityRoundCard from "./ActivityRoundCard";
import { cinzel } from "../layout";
import LinkButton from "./LinkButton";

export default function Competitive({ category }) {
  const { filteredActivities } = useActivity();

  const filteredByCategoryArr = filteredActivities.filter(
    (activity) => activity?.category?.name === category,
  );

  if (!filteredByCategoryArr.length) return null;
  return (
    <section className="bg-red-100 py-10 text-navyBlue sm:py-20">
      <div className="space-y-10 px-4 sm:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center sm:gap-4">
          <h2 className="text-2xl font-semibold uppercase xs:text-4xl sm:text-5xl">
            Competitive Activities
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* first 2 card */}
          <div className="flex flex-col gap-4">
            <ActivityRoundCard
              className={`relative flex h-[500px] items-end overflow-hidden rounded-xl pb-8 duration-300 hover:scale-95 hover:animate-pulse sm:h-[350px]`}
              activity={filteredByCategoryArr[0]}
            />
            <ActivityRoundCard
              className={`h-[500px]`}
              activity={filteredByCategoryArr[1]}
            />
          </div>
          {/* 2nd columns long card */}
          <ActivityRoundCard
            className={"h-[500px] md:h-auto"}
            activity={filteredByCategoryArr[2]}
          />

          {/* 3rd columns width card and small 2 cards */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <ActivityRoundCard
              className={`h-[350px] lg:h-[70%]`}
              activity={filteredByCategoryArr[3]}
            />
            <div className="grid h-[150px] grid-cols-[0.8fr_1fr] gap-4 xs:h-[200px] sm:h-[250px] lg:h-[30%]">
              <ActivityRoundCard
                className={""}
                activity={filteredByCategoryArr[4]}
              />
              <ActivityRoundCard
                className={""}
                activity={filteredByCategoryArr[5]}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <LinkButton
            className={
              "bg-matalicGold text-primary duration-300 hover:scale-90"
            }
            href={"/activities/category/VIP"}
          >
            Explore more
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
