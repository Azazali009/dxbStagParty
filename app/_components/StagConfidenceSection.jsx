import React from "react";
import { playfairDisplay } from "../layout";
import Image from "next/image";
import king from "../svgIcons/king.svg";
import Faqs from "./Faqs";
export default function StagConfidenceSection() {
  return (
    <div className="grid min-h-[600px] grid-cols-1 items-center justify-items-center gap-12 bg-[url('/images/contact-form-bg.webp')] bg-cover bg-no-repeat p-5 sm:p-10 md:grid-cols-2 md:gap-0">
      <div className="flex flex-col gap-4 md:w-[70%]">
        <h1
          className={`${playfairDisplay.className} text-3xl font-semibold !leading-[1.3] sm:text-5xl md:text-3xl lg:text-5xl`}
        >
          hundreds of epic stag weekends designed across dubai
        </h1>
        <Image
          className="self-end"
          src={king}
          width={40}
          height={40}
          alt="legendary"
        />
        <p className="text-sm font-light xs:text-xl">
          your are in legendary hands.
        </p>
      </div>
      <Faqs />
    </div>
  );
}
