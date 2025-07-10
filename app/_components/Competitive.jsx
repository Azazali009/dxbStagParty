"use client";
import { useActivity } from "../_context/ActivityProvider";
import ActivityRoundCard from "./ActivityRoundCard";
import LinkButton from "./LinkButton";

export default function Competitive({ category }) {
  const { filteredActivities } = useActivity();

  const filteredByCategoryArr = filteredActivities.filter(
    (activity) => activity?.category?.name === category,
  );

  if (!filteredByCategoryArr.length) return null;
  return (
    <section className="relative bg-red-100 py-10 text-navyBlue">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-[#1F1000]" />

      <div className="relative z-20 space-y-10 px-4 sm:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center sm:gap-4">
          <h2 className="text-2xl font-semibold uppercase xs:text-4xl sm:text-5xl">
            Competitive Activities
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* first 2 card */}
          <div className="flex flex-col gap-4">
            <ActivityRoundCard
              className={`relative flex h-[500px] items-end overflow-hidden rounded-xl duration-300 hover:scale-95 hover:animate-pulse sm:h-[350px]`}
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
            <div className="grid min-h-[150px] grid-cols-1 gap-4 xs:min-h-[200px] xs:grid-cols-[0.8fr_1fr] sm:h-[250px] lg:h-[30%]">
              <ActivityRoundCard
                className={"h-[190px] xs:h-auto"}
                activity={filteredByCategoryArr[4]}
              />
              <div className="flex flex-col gap-4 md:gap-3">
                <ActivityRoundCard
                  className={"h-[190px] xs:h-[80%]"}
                  activity={filteredByCategoryArr[5]}
                />
                <LinkButton
                  className={
                    "border-secondary py-2 text-center text-white duration-300 hover:scale-90"
                  }
                  href={"/activities/category/VIP"}
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
