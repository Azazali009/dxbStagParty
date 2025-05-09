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
  const { id, name, inclusions, price_band, image } = Package;
  return (
    // v1
    // <section className="mt-12 grid grid-cols-1 gap-8 px-4 py-20 md:grid-cols-2">
    //   <div className="flex flex-col gap-4">
    //     <AnimatedHeading
    //       className={`${cinzel.className} text-left text-softGold`}
    //     >
    //       {name}
    //     </AnimatedHeading>
    //     <h3
    //       className={`${cinzel.className} text-xl font-semibold capitalize sm:text-3xl`}
    //     >
    //       Inclusion
    //     </h3>
    //     <p className={`space-y-4 tracking-wider`}>
    //       {inclusions?.map((inc, i) => {
    //         return (
    //           <span className="block" key={i}>
    //             {i + 1}). {inc}
    //           </span>
    //         );
    //       })}{" "}
    //     </p>
    //     <p className={`mt-auto text-xl font-medium ${cinzel.className}`}>
    //       {" "}
    //       From {price_band}/ Person
    //     </p>
    //   </div>
    //   <div className="flex flex-col items-end gap-4">
    //     <Image
    //       className="h-[320px] rounded-md bg-navyBlue object-cover object-center"
    //       src={image}
    //       width={500}
    //       height={500}
    //       alt={name}
    //     />
    //     <Link
    //       href={`/packages/${id}`}
    //       className="block rounded-full bg-[#b78d5d] px-6 py-2 uppercase backdrop-blur-md duration-300 hover:opacity-80"
    //     >
    //       view package
    //     </Link>
    //   </div>
    //   {/* {packages.slice(0, 3).map((pack) => (
    //     <PackageCard key={pack.id} pack={pack} />
    //   ))} */}
    // </section>
    <section className="relative">
      <div className="absolute left-0 top-0 z-30 h-[200px] w-full bg-gradient-to-b from-primary via-transparent to-transparent"></div>
      <div className="relative flex h-[600px] items-end justify-center bg-cover">
        {/* overlay */}
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-navyBlue"></div>
        <Image
          className="bg-navyBlue object-cover object-top"
          src={"/images/home-package-bg.webp"}
          fill
          alt={name}
        />
        {/* <Link
          href={`/packages/${id}`}
          className="block rounded-full bg-[#b78d5d] px-6 py-2 uppercase backdrop-blur-md duration-300 hover:opacity-80"
        >
          view package
        </Link> */}
      </div>
      <div className="relative z-20 -mt-40 w-full bg-gradient-to-b from-transparent via-navyBlue to-navyBlue p-6 backdrop-blur-sm">
        <div className="mx-auto w-[70%] space-y-4">
          <AnimatedHeading
            className={`${cinzel.className} text-left text-matalicGold`}
          >
            {name}
          </AnimatedHeading>
          <p className="text-2xl text-matalicGold">
            Command the coast rule the night.
          </p>
          <p className="font-extralight leading-[1.8]">
            No shoes, No rules, Just pure superyacht swagger. A 3-hour private
            takeover of Dubai's sleekest vessel - because this isn't just a
            party, it's a statement. Set sail from Dubai Harbour with your
            personal DJ, your butler, and your cocktail assassin. All you need
            to do is show up and own it.
          </p>
          <HomePackageIncludes inclusions={inclusions} />
        </div>
      </div>
    </section>
  );
}
