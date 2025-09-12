"use client";
import Image from "next/image";
import Link from "next/link";
import { useActivity } from "../_context/ActivityProvider";
import { cinzel } from "../layout";
import LinkButton from "./LinkButton";

export default function AdrenalineActivities({ category }) {
  const { filteredActivities } = useActivity();

  const filteredByCategoryArr =
    filteredActivities?.length > 0
      ? filteredActivities?.filter(
          (activity) => activity?.category?.slug === category,
        )
      : null;

  if (!filteredByCategoryArr || filteredByCategoryArr.length === 0) return null;
  return (
    <section className="relative bg-[url('/images/adrenaline-bg.webp')] bg-cover bg-no-repeat py-10">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-black/20 to-softGold" />
      <div className="relative z-20 space-y-10 px-4 sm:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center sm:gap-4">
          <h2
            className={`text-3xl ${cinzel.className} font-bold uppercase xs:text-4xl sm:text-6xl`}
          >
            adrenaline hits
          </h2>
          <p className="text-xs xs:text-sm sm:text-base">
            Thrills that will make your stag legendary
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {filteredByCategoryArr?.slice(0, 7)?.map((act, index) => {
            if (index === 6) {
              // Last card with button underneath
              return (
                <div key={act.id} className="flex flex-col gap-4 md:gap-3">
                  <Link
                    href={`/activities/${act.id}`}
                    className={`relative flex !h-[190px] items-end overflow-hidden rounded-xl pb-3 duration-300 hover:scale-95 hover:animate-pulse md:!h-[130px] 2xl:!h-[230px]`}
                  >
                    <Image
                      src={act.bannerImage}
                      fill
                      alt={act.name}
                      className="object-cover object-center"
                    />
                    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black" />
                    <div className="relative z-10 space-y-4 p-4">
                      <h2
                        className={`${cinzel.className} text-balance text-xl font-bold text-secondary xs:text-base`}
                      >
                        {act.name}
                      </h2>
                    </div>
                  </Link>

                  {/* Button just below the 7th card */}
                  <div>
                    <LinkButton
                      className={
                        "border-secondary bg-[#3D1F00] py-2 text-center text-softGold duration-300 hover:scale-90"
                      }
                      href="/activities/category/Adrenaline"
                    >
                      Explore more adrenaline
                    </LinkButton>
                  </div>
                </div>
              );
            }

            // All other cards (index 0–5)
            return (
              <Link
                href={`/activities/${act.id}`}
                key={act.id}
                className={`relative flex items-end overflow-hidden rounded-xl pb-3 duration-300 hover:scale-95 hover:animate-pulse ${index < 2 ? "h-[500px] 2xl:h-[600px]" : ""} ${index === 4 ? "!h-[300px] md:col-span-2 lg:-translate-y-[35%] 2xl:!h-[400px] 2xl:-translate-y-[25%]" : ""} ${index > 4 ? "!h-[190px] 2xl:!h-[290px]" : ""} ${index >= 2 && index <= 3 ? "h-[600px] 2xl:h-[700px]" : ""} `}
              >
                <Image
                  src={index > 3 ? act.bannerImage : act.image}
                  fill
                  alt={act.name}
                  className="object-cover object-center"
                />
                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black" />
                <div className="relative z-10 space-y-4 p-4">
                  <h2
                    className={`${cinzel.className} text-balance text-xl font-bold text-secondary xs:text-2xl`}
                  >
                    {act.name}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
