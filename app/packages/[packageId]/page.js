import AnimatedHeading from "@/app/_components/AnimatedHeading";
import PackageAddons from "@/app/_components/PackageAddons";
import RelatedPackages from "@/app/_components/RelatedPackages";
import Divider from "@/app/_components/Divider";

export default function Page() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col justify-center gap-4 py-24">
      <AnimatedHeading className={"text-xl !leading-[1.6] md:text-5xl"}>
        Dune Buggy Safari & Desert Party – Private 4x4 dune bashing
      </AnimatedHeading>
      <h2 className="text-center text-sm text-neutral-300 sm:text-lg">
        <span className="mr-2 font-semibold">Package Type:</span>{" "}
        <span className="capitalize text-neutral-500">
          adventure action packed
        </span>
      </h2>
      <PackageAddons />
      <Divider />
      <RelatedPackages />
    </div>
  );
}
