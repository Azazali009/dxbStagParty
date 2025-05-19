import { getPackages } from "../_lib/packagesApi";
import { BebasNeue } from "../layout";
import AnimatedHeading from "./AnimatedHeading";

export default async function PackageHeroSection() {
  const packages = await getPackages();

  return (
    <div className="relative -mt-[110px] flex h-[800px] min-h-screen items-center gap-14 bg-[url('/images/packages-bg.webp')] bg-cover bg-no-repeat px-8 py-20">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black/60 to-transparent"></div>
      <div className="relative z-10 space-y-6">
        <AnimatedHeading
          className={`text-balance pt-16 text-left text-xl !font-normal uppercase !leading-[1.1] text-softGold ${BebasNeue.className} sm:text-wrap md:text-7xl`}
        >
          {" "}
          Dubai&apos;s most legendary <br /> stag party packages
        </AnimatedHeading>
        <p className="">
          {packages.length} curated packages. One unforgettable weekend.
        </p>
      </div>
    </div>
  );
}
