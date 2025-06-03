import Image from "next/image";
import { cinzel } from "../layout";
import HowItWorkIconBox from "./HowItWorkIconBox";
export default function HowItWorks() {
  return (
    <section
      className={`relative grid grid-cols-1 overflow-hidden md:grid-cols-2 md:p-4`}
    >
      <div className="absolute left-0 top-0 z-20 h-full w-full bg-gradient-to-b from-primary via-navyBlue to-black/50 md:bg-gradient-to-r"></div>
      <div className="relative z-20 space-y-10 px-8 py-24">
        <h2
          className={`text-nowrap text-4xl ${cinzel.className} font-semibold text-matalicGold md:text-6xl`}
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
      <div className="relative -z-10 h-[200px] xs:h-[500px] md:h-full">
        <Image
          src={"/images/how-it-work.webp"}
          className="h-full object-cover object-center md:object-contain"
          fill
          alt="image"
        />
      </div>
    </section>
  );
}
