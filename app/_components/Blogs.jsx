import Image from "next/image";
import React from "react";
import { cinzel, playfairDisplay } from "../layout";
import Link from "next/link";

export default function Blogs() {
  return (
    <div className="mx-auto block w-[95%] items-start gap-10 space-y-6 py-14 md:grid md:grid-cols-[1.5fr_2fr] md:space-y-0 lg:grid-cols-[1.5fr_2fr_1fr]">
      {/* blog 1 */}
      <div className="space-y-3 md:space-y-6">
        <Link href={`/blog/11`} className="relative block h-[320px] rounded-lg">
          <Image
            src={"/images/blog1.webp"}
            fill
            alt="blog"
            className="rounded-lg object-cover"
          />
        </Link>
        <p>BLOG</p>
        <Link href={`/blog/11`} className="block">
          <h2
            className={`${playfairDisplay.className} text-2xl font-semibold capitalize leading-[1.3] lg:text-3xl xl:text-4xl`}
          >
            top villas for large groups
          </h2>
        </Link>
        <p className="text-matalicGold">Spacious,stylish and ready to party</p>
        {/* blog 2 */}
        <Link
          href={`/blog/13`}
          className="!mt-14 flex flex-col justify-center gap-6 rounded-xl bg-navyBlue p-8"
        >
          <p className={`${cinzel.className}`}>TIP</p>
          <h2
            className={`${playfairDisplay.className} text-2xl font-semibold capitalize leading-[1.3] lg:text-3xl xl:text-4xl`}
          >
            6 Real-Life stag party fails
          </h2>
        </Link>
      </div>

      <div className="space-y-6">
        {/* blog 3 */}
        <Link
          href={`/blog/10`}
          className="flex h-[320px] flex-col justify-center gap-6 rounded-xl bg-[#694621] p-6"
        >
          <p>BLOG</p>
          <h2
            className={`${playfairDisplay.className} text-5xl font-semibold capitalize leading-[1.3] md:text-6xl lg:text-5xl xl:text-6xl`}
          >
            Beach <br /> party hacks
          </h2>
          <p className="text-lg capitalize">
            tips for the ultimate dubai beach bash
          </p>
        </Link>
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {/* blog 4 */}
          <Link
            href={"/blog/12"}
            className="block space-y-5 rounded-xl bg-navyBlue p-7"
          >
            <p className={`${playfairDisplay.className} uppercase`}>TIP</p>
            <h2
              className={`${playfairDisplay.className} text-lg font-light capitalize !leading-[1.7] xs:text-2xl sm:text-3xl`}
            >
              dress codes decoded
            </h2>
          </Link>
          {/* blog 5 */}
          <Link
            href={"/blog/13"}
            className="block space-y-5 rounded-xl bg-navyBlue p-7"
          >
            <p className={`${playfairDisplay.className} uppercase`}>Read</p>
            <h2
              className={`${playfairDisplay.className} text-lg font-light capitalize !leading-[1.7] xs:text-2xl sm:text-3xl`}
            >
              6 real life stag party fails
            </h2>
          </Link>
        </div>
        {/* blog 6 */}
        <Link
          href={"/blog/14"}
          className="block space-y-5 rounded-xl bg-navyBlue p-3 xs:p-8"
        >
          <p className={`${playfairDisplay.className} uppercase`}>PDF</p>
          <h2
            className={`${playfairDisplay.className} text-2xl font-light capitalize leading-[1.5] xs:text-4xl`}
          >
            VIP club cheat sheet
          </h2>
        </Link>
      </div>
      {/* Reels */}
      <div className="col-span-2 grid grid-cols-2 gap-8 lg:col-span-1 lg:grid-cols-1">
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute left-0 top-0 h-full w-full space-y-6 bg-navyBlue/50 p-4">
            <p className="uppercase">Reels</p>
            <h2
              className={`${playfairDisplay.className} text-xl font-semibold capitalize leading-[1.3] xs:text-4xl`}
            >
              dub-buggy ride in desert
            </h2>
          </div>
          <video
            width="100%"
            controls
            playsInline
            muted
            autoPlay
            loop
            className="rounded-xl"
          >
            <source src="/videos/buggy.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute left-0 top-0 flex h-full w-full items-end bg-navyBlue/50 p-4 pb-14">
            <h2
              className={`${playfairDisplay.className} text-xl font-semibold capitalize leading-[1.3] xs:text-4xl`}
            >
              day to night in dubai
            </h2>
          </div>
          <video
            width="100%"
            controls
            playsInline
            muted
            autoPlay
            loop
            className="rounded-xl"
          >
            <source src="/videos/dayNight.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
