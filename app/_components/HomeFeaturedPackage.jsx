import PackageCard from "./PackageCard";
import { getPackageById } from "../_lib/packagesApi";
import Image from "next/image";
import Link from "next/link";
import { cinzel } from "../layout";
import AnimatedHeading from "./AnimatedHeading";
import HomePackageIncludes from "./HomePackageIncludes";

export const revalidate = 0;
export default async function HomeFeaturedPackage() {
  const Package = await getPackageById(1);
  const { name, inclusions } = Package;
  return (
    <section className="relative">
      <div className="absolute left-0 top-0 z-30 h-[200px] w-full bg-gradient-to-b from-primary via-transparent to-transparent"></div>
      <div className="relative flex h-[300px] items-end justify-center bg-cover sm:h-[600px]">
        {/* overlay */}
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-navyBlue"></div>
        <Image
          className="bg-navyBlue object-cover object-top"
          src={"/images/home-package-bg.webp"}
          fill
          alt={name}
        />
      </div>
      <div className="relative z-20 -mt-20 w-full bg-gradient-to-b from-transparent via-navyBlue to-navyBlue p-6 backdrop-blur-sm sm:-mt-40">
        <div className="mx-auto w-[95%] space-y-4 sm:w-[70%]">
          <AnimatedHeading
            className={`${cinzel.className} text-left text-matalicGold`}
          >
            {name}
          </AnimatedHeading>
          <p className="text-sm text-matalicGold xs:text-2xl">
            Command the coast rule the night.
          </p>
          <p className="text-sm font-extralight leading-[1.8] xs:text-base">
            No shoes, No rules, Just pure superyacht swagger. A 3-hour private
            takeover of Dubai&apos;s sleekest vessel - because this isn&apos;t
            just a party, it&apos;s a statement. Set sail from Dubai Harbour
            with your personal DJ, your butler, and your cocktail assassin. All
            you need to do is show up and own it.
          </p>
          <HomePackageIncludes inclusions={inclusions} />
        </div>
      </div>
    </section>
  );
}
