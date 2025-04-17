import Image from "next/image";
import MeteorsDemo from "./MeteorsDemo";
import HowItWorkIconBox from "./HowItWorkIconBox";
import { cinzel } from "../layout";
export default function HowItWorks() {
  return (
    <section className={`relative grid grid-cols-2 overflow-hidden`}>
      <div className="absolute left-0 top-0 z-20 h-full w-full bg-gradient-to-r from-primary via-navyBlue to-black/50"></div>
      <div className="relative z-20 space-y-10 px-8 py-24">
        <h2
          className={`text-2xl ${cinzel.className} font-semibold text-matalicGold sm:text-6xl`}
        >
          How it works
        </h2>
        <div className="mx-auto flex flex-col gap-14">
          {/* package box */}
          <HowItWorkIconBox
            image="/images/packageIcon.png"
            title="Choose Package"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              officia!"
          />
          <HowItWorkIconBox
            image="/images/Customize.png"
            title="Customize"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          officia!"
          />
          <HowItWorkIconBox
            image="/images/Split-Payment.png"
            title="Split Payment"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          officia!"
          />
          <HowItWorkIconBox
            image="/images/party.png"
            title="party"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          officia!"
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
