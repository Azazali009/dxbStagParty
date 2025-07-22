"use client";
import { useActivity } from "../_context/ActivityProvider";
import { cinzel } from "../layout";
import ActivityRoundCard from "./ActivityRoundCard";
import LinkButton from "./LinkButton";

export default function ChillRecovery({ category }) {
  const { filteredActivities } = useActivity();

  const filteredByCategoryArr =
    filteredActivities.length > 0
      ? filteredActivities.filter(
          (activity) => activity?.category?.slug === category,
        )
      : null;

  if (!filteredByCategoryArr || filteredByCategoryArr.length === 0) return null;
  return (
    <section className="relative bg-navyBlue py-10 text-matalicGold sm:py-20">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-[#362A23]" />

      <div className="relative z-20 space-y-10 px-4 sm:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center sm:gap-4">
          <h2
            className={`${cinzel.className} text-xl font-bold capitalize leading-[1.4] xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl`}
          >
            Chill & Luxe &mdash;{" "}
            <span className="font-light">
              Because not <br /> everything has to be loud
            </span>
          </h2>
          <p className="text-[9px] leading-[1.8] xs:text-xs sm:text-base">
            Balance out the madness with experiences that are stylish, scenic,
            and seriously smooth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* first 2 card */}
          <div className="flex flex-col gap-4">
            <ActivityRoundCard
              className={`relative flex h-[500px] items-end overflow-hidden rounded-xl duration-300 hover:scale-95 hover:animate-pulse sm:h-[350px]`}
              activity={filteredByCategoryArr[0]}
              border="border-2 border-secondary"
            />
            <ActivityRoundCard
              className={`h-[500px]`}
              activity={filteredByCategoryArr[1]}
              border="border-2 border-secondary"
            />
          </div>
          {/* 2nd columns long card */}
          <ActivityRoundCard
            className={"h-[500px] md:h-auto"}
            activity={filteredByCategoryArr[2]}
            border="border-2 border-secondary"
          />

          {/* 3rd columns width card and small 2 cards */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <ActivityRoundCard
              className={`h-[350px] lg:h-[70%]`}
              activity={filteredByCategoryArr[3]}
              border="border-2 border-secondary"
            />
            <div className="grid min-h-[150px] grid-cols-1 gap-4 xs:min-h-[200px] xs:grid-cols-[0.8fr_1fr] sm:h-[250px] lg:h-[30%]">
              <ActivityRoundCard
                className={"h-[190px] xs:h-auto"}
                activity={filteredByCategoryArr[4]}
                border="border-2 border-secondary"
              />
              <div className="flex flex-col gap-4 md:gap-3">
                <ActivityRoundCard
                  className={"h-[190px] xs:h-[80%]"}
                  activity={filteredByCategoryArr[5]}
                  border="border-2 border-secondary"
                />
                <LinkButton
                  className={
                    "border-secondary py-2 text-center text-white duration-300 hover:scale-90"
                  }
                  href={"/activities/category/Chill & Luxe"}
                >
                  Explore more
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
