import Image from "next/image";
import { cinzel, playfairDisplay } from "../layout";
import experienceSvg from "../svgIcons/experience.svg";
import trustSvg from "../svgIcons/trust.svg";

export default function WhyChooseUs() {
  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center object-cover py-14">
      {/* blur overlay */}
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-navyBlue/30 backdrop-blur-md"></div>
      <Image
        className="h-full object-cover"
        src={"/images/whyChooseUs-bg.webp"}
        fill
        alt="why choose us"
      />
      <div className="relative z-20 space-y-8 text-center">
        <h2
          className={`${cinzel.className} text-2xl font-semibold text-matalicGold sm:text-3xl md:text-6xl`}
        >
          Why choose dxb <br /> stag parties
        </h2>
        <p
          className={`${playfairDisplay.className} text-xl font-semibold tracking-wider`}
        >
          Elevate Your Celebration to Legendary Status
        </p>
        <p className="mx-auto text-balance leading-[1.6] sm:w-[80%]">
          At DXB Stag Parties, we specialize in curating unforgettable stag
          experiences across Dubai and the UAE.
        </p>
        <div className="!mt-14 w-full space-y-6 p-4 text-left">
          <h3
            className={`text-2xl ${cinzel.className} font-semibold text-matalicGold`}
          >
            What Sets Us Apart:
          </h3>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <Image
                src={experienceSvg}
                width={20}
                height={20}
                alt="experience"
              />
              <h4 className="text-sm font-medium xs:text-base">
                Tailored Experiences
              </h4>
            </div>
            <p className="text-xs font-extralight xs:text-base">
              Every party is customized to your group.
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <Image src={trustSvg} width={20} height={20} alt="experience" />
              <h4 className="text-sm font-medium xs:text-base">
                Exclusive Access
              </h4>
            </div>
            <p className="text-xs font-extralight xs:text-base">
              Entry to Dubai&apos;s top venues and hotspots.
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <Image src={trustSvg} width={20} height={20} alt="experience" />
              <h4 className="text-sm font-medium xs:text-base">
                Comprehensive Planning
              </h4>
            </div>
            <p className="text-xs font-extralight xs:text-base">
              We handle all logistics from start to finish.
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <Image src={trustSvg} width={20} height={20} alt="experience" />
              <h4 className="text-sm font-medium xs:text-base">
                Local Expertise
              </h4>
            </div>
            <p className="text-xs font-extralight xs:text-base">
              Your well-being is our top priority.
            </p>
          </div>
        </div>
        <div className="space-y-4 !py-6">
          <p
            className={`text-base xs:text-xl ${playfairDisplay.className} font-light !italic tracking-wider`}
          >
            &quot;DXB Stag Parties turned our celebration into an epic
            adventure. <br />
            Every detail was flawless!&quot;
          </p>
          <p className="font-light">- James 1, London</p>
        </div>
        <p
          className={`text-base xs:text-xl ${playfairDisplay.className} font-light !italic tracking-wider`}
        >
          &quot;From the yacht party to the VIP club access, everything <br />{" "}
          exceeded our expectations.&quot;
        </p>
      </div>
    </div>
  );
}
