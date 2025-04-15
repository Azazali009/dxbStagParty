import PackageCard from "./PackageCard";
import { getPackageById } from "../_lib/packagesApi";
import Image from "next/image";
import Link from "next/link";
import { cinzel } from "../layout";
import AnimatedHeading from "./AnimatedHeading";

export const revalidate = 0;
export default async function HomePackages() {
  const Package = await getPackageById(1);
  const { id, name, inclusions, price_band, image } = Package;
  return (
    <section className="mt-12 grid grid-cols-1 gap-8 px-4 py-20 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <AnimatedHeading
          className={`${cinzel.className} text-softGold text-left`}
        >
          {name}
        </AnimatedHeading>
        <h3
          className={`${cinzel.className} text-xl font-semibold capitalize sm:text-3xl`}
        >
          Inclusion
        </h3>
        <p className={`space-y-4 tracking-wider`}>
          {inclusions?.map((inc, i) => {
            return (
              <span className="block" key={i}>
                {i + 1}). {inc}
              </span>
            );
          })}{" "}
        </p>
        <p className={`mt-auto text-xl font-medium ${cinzel.className}`}>
          {" "}
          From {price_band}/ Person
        </p>
      </div>
      <div className="flex flex-col items-end gap-4">
        <Image
          className="bg-navyBlue h-[320px] rounded-md object-cover object-center"
          src={image}
          width={500}
          height={500}
          alt={name}
        />
        <Link
          href={`/packages/${id}`}
          className="block rounded-full bg-[#b78d5d] px-6 py-2 uppercase backdrop-blur-md duration-300 hover:opacity-80"
        >
          view package
        </Link>
      </div>
      {/* {packages.slice(0, 3).map((pack) => (
        <PackageCard key={pack.id} pack={pack} />
      ))} */}
    </section>
  );
}
