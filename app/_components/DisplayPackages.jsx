import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getPackages } from "../_lib/packagesApi";

export default async function AdrenalineActivities() {
  const packages = await getPackages();
  return (
    <section className="bg-[#694621] py-40">
      <div className="mx-auto w-[95%]">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-semibold uppercase">
            exclusive packages
          </h2>
          <p>
            All-in-one experiences crafted for the ultimate stag celebration
          </p>
        </div>

        <div className="!mt-20 grid grid-cols-[1fr_1fr_1fr] items-start gap-x-12">
          {/* card 1 */}
          {packages.map((pack, index) => {
            return (
              <div key={pack.id}>
                {index === 3 ? (
                  <div className="relative col-span-2 -mt-16 flex h-[350px] origin-left items-end overflow-hidden rounded-lg p-6 [transform:perspective(300px)_rotateY(5deg)_scale(1.4)_rotateZ(4deg)]">
                    {/* titl design */}
                    <div className="absolute right-0 top-0 z-20 h-6 w-[60%] rounded-b-3xl rounded-r-none bg-[#694621]"></div>
                    {/* overlay */}
                    <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
                    <Image
                      src={pack?.image}
                      fill
                      alt="image"
                      className="object-cover"
                    />
                    <h2 className="relative z-10 text-4xl font-medium">
                      {pack?.name}
                    </h2>
                    {/* book button */}
                    <div className="group absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center duration-300 hover:bg-navyBlue/60">
                      {" "}
                      <Link
                        className="pointer-events-none invisible translate-y-full rounded-md bg-white px-6 py-2 capitalize text-navyBlue opacity-0 shadow-2xl duration-500 active:translate-y-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                        href={`/activities/${pack?.id}`}
                      >
                        Book your slot
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div
                    key={pack.id}
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
                        href={`/activities/${pack.id}`}
                      >
                        Book your slot
                      </Link>
                    </div>
                    <Image
                      src={pack.image}
                      fill
                      alt={pack.name}
                      className="object-cover"
                    />
                    <h2 className="relative z-20 text-xl font-medium">
                      {pack.name}
                    </h2>
                  </div>
                )}
              </div>
            );
          })}

          {/* cta column 5 */}
          {packages.length >= 3 && (
            <div
              className="flex flex-col gap-6 self-center text-center"
              style={{
                gridColumn: packages.length === 3 && "1/-1",
                justifySelf: "center",
                marginTop: "60px",
              }}
            >
              <Link
                href={`#`}
                className="flex items-center rounded-2xl bg-navyBlue p-6 text-2xl font-medium capitalize duration-300 hover:opacity-70"
              >
                explore all exclusive packages
              </Link>
              <p className="text-xl">or browse all 12+ stag packages</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
