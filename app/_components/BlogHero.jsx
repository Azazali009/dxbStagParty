import React from "react";
import { playfairDisplay } from "../layout";
import Link from "next/link";

export default function BlogHero() {
  return (
    <div className="relative h-[700px] overflow-hidden rounded-xl bg-[url(/images/blog-bg.jpg)] bg-cover bg-no-repeat">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-navyBlue/70 to-transparent"></div>
      <div className="relative z-10 flex min-h-[800px] w-[50%] flex-col justify-center gap-6 p-6">
        <p className="uppercase">Guide</p>
        <h1
          className={`${playfairDisplay.className} text-8xl font-semibold capitalize leading-[1.3]`}
        >
          Ulimate <br /> VIP guide
        </h1>
        <p className="text-xl">
          Party like ballers with exclusive table, lounges & more
        </p>
        <div>
          <Link
            href="#"
            className="rounded-lg border-2 border-[#70592f] bg-[#70592f] px-6 py-2 text-lg capitalize duration-300 hover:bg-reddish"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
