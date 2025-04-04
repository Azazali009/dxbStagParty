import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";
import packageIcon from "@/public/images/packages.png";
import adventureIcon from "@/public/images/adventure.png";
import planningIcon from "@/public/images/planning.png";
import topRatedIcon from "@/public/images/top.png";

export default function HomeHeroSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-[url('/home-her-bg.webp')] bg-cover pb-10 pt-32 sm:min-h-screen">
      <AnimatedHeading className={"text-white"}>
        Stag Parties in{" "}
        <span className="rounded-md bg-secondary/80 px-1 underline decoration-secondary decoration-[6px] underline-offset-[30px] backdrop-blur-md">
          Dubai
        </span>{" "}
        – The Ultimate Bachelor Experience!
      </AnimatedHeading>
      <p className="text-balance text-center text-sm text-neutral-200 sm:w-[70%] sm:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
        quasi, dolorum nobis impedit veritatis ipsam enim earum iusto laboriosam
        officiis, mollitia numquam temporibus?
      </p>

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
      </div>
      {/* divider */}
      <div className="h-[0.06px] w-[95%] bg-neutral-600"></div>
      <div className="grid grid-cols-4 gap-20 text-white">
        <div className="flex items-center gap-2">
          <Image
            src={packageIcon}
            width={100}
            height={100}
            alt="packages"
            className="w-8"
          />
          <p>Exclusive packages</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={adventureIcon}
            width={100}
            height={100}
            alt="packages"
            className="w-8"
          />
          <p>Luxury & adventure</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={planningIcon}
            width={100}
            height={100}
            alt="packages"
            className="w-8"
          />

          <p>hassle free planning</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={topRatedIcon}
            width={100}
            height={100}
            alt="packages"
            className="w-8"
          />

          <p>top rated services</p>
        </div>
      </div>
    </section>
  );
}
