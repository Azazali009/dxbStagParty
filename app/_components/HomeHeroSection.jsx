import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";
import { cinzel } from "../layout";

export default function HomeHeroSection() {
  return (
    <section className="relative flex flex-col gap-10 bg-[url('/images/home-hero.png')] bg-cover p-4 pb-10 pt-32 sm:min-h-screen">
      {/* overlay */}
      <div className="bg-navyBlue/30 absolute left-0 top-0 h-full w-full"></div>

      <div className="relative z-10 ml-12 max-w-[500px] space-y-8">
        <AnimatedHeading
          className={`text-left ${cinzel.className} uppercase !leading-[1.2] text-white`}
        >
          Plan the ultimate stag party in dubai
        </AnimatedHeading>
        <button className="rounded-full bg-[#b78d5d] px-6 py-2 text-lg font-medium capitalize backdrop-blur-md duration-300 hover:opacity-80">
          start plaining
        </button>
      </div>

      {/* 
      <div className="flex gap-8 rounded-full bg-gradient-to-r from-secondary to-[#997c26] px-12 py-3 text-neutral-800">
        <button className="font-medium duration-300 hover:text-white">
          Activities
        </button>
        <button className="font-medium duration-300 hover:text-white">
          Packages
        </button>
        <button className="font-medium duration-300 hover:text-white">
          Expereince
        </button>
      </div> */}
      {/* divider */}
      {/* <div className="h-[0.06px] w-[95%] bg-neutral-600"></div>
      <div className="grid grid-cols-4 gap-20 text-white">
        <div className="flex items-center gap-2">
          <Image
            src={"/images/packages.png"}
            width={100}
            height={100}
            alt="packages"
            className="w-8"
          />
          <p>Exclusive packages</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={"/images/adventure.png"}
            width={100}
            height={100}
            alt="packages"
            className="w-8"
          />
          <p>Luxury & adventure</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={"/images/planning.png"}
            width={100}
            height={100}
            alt="packages"
            className="w-8"
          />

          <p>hassle free planning</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={"/images/top.png"}
            width={100}
            height={100}
            alt="packages"
            className="w-8"
          />

          <p>top rated services</p>
        </div>
      </div> */}
    </section>
  );
}
