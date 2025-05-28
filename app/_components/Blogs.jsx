import Image from "next/image";
import React from "react";
import { cinzel, playfairDisplay } from "../layout";
import Link from "next/link";

export default function Blogs() {
  return (
    <div className="mx-auto grid w-[95%] grid-cols-[1.5fr_2fr_1fr] items-start gap-10 py-14">
      {/* blog 1 */}
      <div className="space-y-6">
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
            className={`${playfairDisplay.className} text-5xl font-semibold capitalize leading-[1.3]`}
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
            className={`${playfairDisplay.className} text-5xl font-semibold capitalize leading-[1.3]`}
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
            className={`${playfairDisplay.className} text-6xl font-semibold capitalize leading-[1.3]`}
          >
            Beach <br /> party hacks
          </h2>
          <p className="text-lg capitalize">
            tips for the ultimate dubai beach bash
          </p>
        </Link>
        <div className="grid grid-cols-2 gap-8">
          {/* blog 4 */}
          <Link
            href={"/blog/12"}
            className="block space-y-5 rounded-xl bg-navyBlue p-7"
          >
            <p className={`${playfairDisplay.className} uppercase`}>TIP</p>
            <h2
              className={`${playfairDisplay.className} text-4xl font-light capitalize leading-[1.5]`}
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
              className={`${playfairDisplay.className} text-4xl font-light capitalize leading-[1.5]`}
            >
              6 real life stag party fails
            </h2>
          </Link>
        </div>
        {/* blog 6 */}
        <Link
          href={"/blog/14"}
          className="block space-y-5 rounded-xl bg-navyBlue p-8"
        >
          <p className={`${playfairDisplay.className} uppercase`}>PDF</p>
          <h2
            className={`${playfairDisplay.className} text-4xl font-light capitalize leading-[1.5]`}
          >
            VIP club cheat sheet
          </h2>
        </Link>
      </div>
      {/* Reels */}
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute left-0 top-0 h-full w-full space-y-6 bg-navyBlue/50 p-4">
            <p className="uppercase">Reels</p>
            <h2
              className={`${playfairDisplay.className} text-4xl font-semibold capitalize leading-[1.3]`}
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
              className={`${playfairDisplay.className} text-4xl font-semibold capitalize leading-[1.3]`}
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
