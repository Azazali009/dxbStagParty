"use client";
import { useActivity } from "../_context/ActivityProvider";
import ActivityRoundCard from "./ActivityRoundCard";
import LinkButton from "./LinkButton";

export default function FoodDrink({ category }) {
  const { filteredActivities } = useActivity();

  const filteredByCategoryArr = filteredActivities.filter(
    (activity) => activity?.category?.name === category,
  );

  if (!filteredByCategoryArr.length) return null;
  return (
    <section className="bg-[#1F1000] py-10 text-softGold sm:py-20">
      <div className="space-y-10 px-4 sm:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center sm:gap-4">
          <h2 className="text-2xl font-semibold uppercase xs:text-4xl sm:text-5xl">
            Food & Drinks
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:min-h-[600px] md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4">
          {/* first lengthy card */}
          <ActivityRoundCard
            activity={filteredByCategoryArr[0]}
            className={
              "min-h-[400px] md:row-span-2 md:min-h-[500px] lg:min-h-full"
            }
          />

          {/* 2nd column */}
          <div className="row-span-2 flex min-h-[700px] flex-col gap-4 md:min-h-full lg:col-span-2">
            <ActivityRoundCard
              activity={filteredByCategoryArr[1]}
              className={"h-[50%] md:h-[40%] 2xl:h-[50%]"}
            />

            <div className="grid h-[50%] grid-cols-1 gap-4 sm:grid-cols-[0.7fr_1fr] md:h-[60%] 2xl:h-[50%]">
              <ActivityRoundCard activity={filteredByCategoryArr[2]} />
              <ActivityRoundCard activity={filteredByCategoryArr[3]} />
            </div>
          </div>

          {/* 3rd column */}
          <div className="flex min-h-[600px] flex-col gap-4 md:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-full">
            <ActivityRoundCard
              activity={filteredByCategoryArr[4]}
              className={"min-h-[50%] lg:min-h-[60%]"}
            />
            <div className="flex min-h-[50%] flex-col gap-2 sm:h-auto lg:min-h-[40%]">
              <ActivityRoundCard
                activity={filteredByCategoryArr[5]}
                className={"h-[80%] lg:h-[70%]"}
              />
              <LinkButton
                className={
                  "h-[20%] border-secondary bg-[#3D1F00] py-2 text-center text-softGold duration-300 hover:scale-90"
                }
                href={"/activities/category/VIP"}
              >
                Explore more
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
