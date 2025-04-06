import AnimatedHeading from "@/app/_components/AnimatedHeading";
import PackageAddons from "@/app/_components/PackageAddons";
import RelatedPackages from "@/app/_components/RelatedPackages";
import Divider from "@/app/_components/Divider";
import { getPackages } from "@/app/_lib/packagesApi";
import { getPackageById } from "@/app/_lib/packagesApi";
import Image from "next/image";

export const revalidate = 0;
export async function generateStaticParams() {
  const packages = await getPackages();
  const ids = packages.map((pack) => ({
    bookingID: String(pack.id),
  }));

  return ids;
}
export default async function Page({ params }) {
  const Package = await getPackageById(params.packageId);

  return (
    <div className="mx-auto flex flex-col justify-center gap-14">
      <div className="relative flex min-h-screen w-full items-center justify-center bg-black">
        <Image
          src={Package.image}
          fill
          alt={Package.name}
          className="bg-black opacity-35"
        />
        <AnimatedHeading className={"z-20 text-xl !leading-[1.6] md:text-5xl"}>
          {Package.name}
        </AnimatedHeading>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 text-neutral-700 md:grid-cols-3 lg:grid-cols-5">
        <div className="flex flex-col gap-2 rounded-md p-4 text-center text-sm shadow-lg sm:text-lg">
          <span className="mr-2 font-semibold">Blurb:</span>{" "}
          <span className="text-sm capitalize leading-[1.7]">
            {Package.blurb}
          </span>
        </div>
        <div className="flex flex-col gap-2 rounded-md bg-transparent p-4 text-center text-sm shadow-lg sm:text-lg">
          <span className="mr-2 font-semibold">Tags:</span>{" "}
          <span className="text-sm capitalize leading-[1.7]">
            {Package.tags.join(", ")}
          </span>
        </div>
        <div className="flex flex-col gap-2 rounded-md bg-transparent p-4 text-center text-sm shadow-lg sm:text-lg">
          <span className="mr-2 font-semibold">Inclusions:</span>{" "}
          <span className="text-sm capitalize leading-[1.7]">
            {Package.inclusions.join(", ")}
          </span>
        </div>
        <div className="flex flex-col gap-2 rounded-md bg-transparent p-4 text-center text-sm shadow-lg sm:text-lg">
          <span className="mr-2 font-semibold">Group size:</span>{" "}
          <span className="text-sm capitalize leading-[1.7]">
            {Package.group_size} peoples
          </span>
        </div>
        <div className="flex flex-col gap-2 rounded-md bg-transparent p-4 text-center text-sm shadow-lg sm:text-lg">
          <span className="mr-2 font-semibold">Price:</span>{" "}
          <span className="text-sm leading-[1.7]">
            AED{" "}
            <strong className="text-xl text-secondary">
              {Package.price_band}
            </strong>{" "}
            pp
          </span>
        </div>
      </div>

      <PackageAddons addons={Package.add_ons} price={Package.price_band} />
      <Divider />
      <RelatedPackages />
    </div>
  );
}
