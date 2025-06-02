"use client";
import Image from "next/image";
import Link from "next/link";
import { useActivity } from "../_context/ActivityProvider";

export default function AdrenalineActivities({ category }) {
  const { filteredActivities } = useActivity();

  const filteredByCategoryArr = filteredActivities.filter(
    (activity) => activity?.category?.name === category,
  );

  if (!filteredByCategoryArr.length) return null;
  return (
    <section className="bg-[url('/images/adrenaline-bg.webp')] bg-cover bg-no-repeat pb-40 pt-20">
      <div className="mx-auto w-[90%]">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-5xl font-semibold uppercase">adrenaline hits</h2>
          <p>Thrills that will make your stag legendary</p>
        </div>
        <div className="mx-auto !mt-20 grid max-w-full grid-cols-[250px] justify-center justify-items-center gap-x-10 md:max-w-7xl md:grid-cols-[250px_250px] lg:grid-cols-[250px_250px_250px]">
          {filteredByCategoryArr.map((activity, index) => {
            return (
              <>
                {index === 3 ? (
                  // [transform:perspective(300px)_rotateY(5deg)_scale(1.3)]
                  <div className="path relative col-span-2 -mt-16 flex h-[300px] items-end overflow-hidden rounded-lg p-6">
                    {/* titl design */}
                    <div className="absolute right-0 top-0 z-20 h-6 w-[55%] rounded-b-3xl rounded-r-none bg-[#814103]"></div>
                    {/* overlay */}
                    <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
                    <Image
                      src={activity?.bannerImage}
                      fill
                      alt="image"
                      className="object-cover"
                    />
                    <h2 className="relative z-10 py-8 text-4xl font-medium">
                      {activity?.name}
                    </h2>
                    {/* book button */}
                    <div className="group absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center duration-300 hover:bg-navyBlue/60">
                      {" "}
                      <Link
                        className="pointer-events-none invisible translate-y-full rounded-md bg-white px-6 py-2 capitalize text-navyBlue opacity-0 shadow-2xl duration-500 active:translate-y-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                        href={`/activities/${activity?.id}`}
                      >
                        Book your slot
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-20">
                    <Link
                      href={`/activities/${activity.id}`}
                      className={`group relative block origin-top overflow-hidden rounded-2xl ${index === 0 && "slanted-rectangle h-[450px] ![transform:perspective(300px)_rotateY(-5deg)]"} ${index === 1 && "middle-card"} ${index === 2 && "third-card h-[500px] ![transform:perspective(400px)_rotateX(5deg)_rotateY(1deg)_rotateZ(-1deg)_skewX(-2deg)]"} `}
                    >
                      {/* overlay */}
                      <div className="absolute left-0 top-0 z-20 flex h-full w-full items-end bg-black/40 p-4"></div>
                      <div className="content relative z-30 flex h-full w-full items-end p-6">
                        {" "}
                        <h1 className={`text-3xl font-medium`}>
                          {activity.name}
                        </h1>
                      </div>
                      <Image
                        className="object-cover duration-300 group-hover:scale-105"
                        src={activity.image}
                        fill
                        alt="image"
                      />
                    </Link>
                  </div>
                )}
              </>
            );
          })}

          {/* cta column 5 */}
          {filteredByCategoryArr.length >= 3 && (
            <div
              className="flex flex-col gap-6 self-center text-center"
              style={{
                gridColumn: filteredByCategoryArr.length === 3 && "1/-1",
                justifySelf: "center",
                marginTop: "120px",
              }}
            >
              <Link
                href={`/activities/category/${filteredByCategoryArr[0]?.category?.name}`}
                className="flex items-center rounded-2xl bg-navyBlue p-6 text-xl font-medium capitalize duration-300 hover:opacity-70"
              >
                explore all adrenaline activities
              </Link>
              <p className="text-xl">or browse all 60+ stag activities</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
