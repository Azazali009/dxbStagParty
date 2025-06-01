import Image from "next/image";
import { cinzel } from "../layout";
import HowItWorkIconBox from "./HowItWorkIconBox";
export default function HowItWorks() {
  return (
    <section className={`relative grid grid-cols-2 overflow-hidden p-4`}>
      <div className="absolute left-0 top-0 z-20 h-full w-full bg-gradient-to-r from-primary via-navyBlue to-black/50"></div>
      <div className="relative z-20 space-y-10 px-8 py-24">
        <h2
          className={`text-2xl ${cinzel.className} font-semibold text-matalicGold sm:text-4xl md:text-6xl`}
        >
          How it works
        </h2>
        <div className="mx-auto flex flex-col gap-8">
          {/* package box */}
          <HowItWorkIconBox
            image="/images/packageIcon.png"
            title="Choose Package"
            desc="Pick from our cinematic packages-or build your own. You're in charge."
          />
          <HowItWorkIconBox
            image="/images/Customize.png"
            title="Customize"
            desc="Tailor it all-dinner, DJs,dune buggies, and a few widcarrs."
          />
          <HowItWorkIconBox
            image="/images/Split-Payment.png"
            title="Split Payment"
            desc="Each guest pays their share.No stress for the best man."
          />
          <HowItWorkIconBox
            image="/images/party.png"
            title="party"
            desc="Show up, turn up, and party like there's no tomorrow."
          />
        </div>
      </div>
      <div className="relative -z-10 h-full">
        <Image
          src={"/images/how-it-work.webp"}
          className="h-full object-contain object-center"
          fill
          alt="image"
        />
      </div>
    </section>
  );
}
