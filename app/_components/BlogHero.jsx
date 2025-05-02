import React from "react";
import { playfairDisplay } from "../layout";

export default function BlogHero() {
  return (
    <div className="relative min-h-[800px] bg-[url(/images/blog-bg.webp)] bg-cover bg-no-repeat">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-navyBlue/70 to-transparent"></div>
      <div className="relative z-10 flex min-h-[800px] w-[50%] flex-col justify-center gap-4 p-6">
        <p className="uppercase">Guid</p>
        <h1
          className={`${playfairDisplay.className} text-8xl font-semibold capitalize leading-[1.3]`}
        >
          Ulimate <br /> VIP guide
        </h1>
        <p className="text-xl">
          Party like ballers with exclusive table, lounges & more
        </p>
      </div>
    </div>
  );
}
