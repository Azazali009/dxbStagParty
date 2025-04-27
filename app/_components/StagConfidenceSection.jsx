import React from "react";
import { playfairDisplay } from "../layout";
import Image from "next/image";
import king from "../svgIcons/king.svg";
import Faqs from "./Faqs";
export default function StagConfidenceSection() {
  return (
    <div className="grid h-[600px] min-h-screen grid-cols-1 items-center justify-items-center bg-[url('/images/contact-form-bg.webp')] bg-cover bg-no-repeat p-10 md:grid-cols-2">
      <div className="flex w-[70%] flex-col gap-4">
        <h1
          className={`${playfairDisplay.className} text-5xl font-semibold leading-[1.3]`}
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
        <p className="text-xl font-light">your are in legendary hands.</p>
      </div>
      <Faqs />
    </div>
  );
}
