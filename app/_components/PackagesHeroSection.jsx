import { getPackages } from "../_lib/packagesApi";
import { BebasNeue } from "../layout";
import AnimatedHeading from "./AnimatedHeading";

export default async function PackageHeroSection() {
  const packages = await getPackages();

  return (
    <div className="relative -mt-[110px] flex h-[320px] items-end bg-[url('/images/packages-bg.webp')] bg-cover bg-no-repeat px-4 py-4 xs:h-[400px] xs:items-center xs:py-10 sm:h-[500px] sm:px-8 md:h-[600px] md:py-20 lg:h-[800px]">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black/60 to-navyBlue/40"></div>
      <div className="relative z-10 space-y-1 xs:space-y-3 sm:space-y-6">
        <AnimatedHeading
          className={`text-balance text-left text-3xl !font-normal uppercase !leading-[1.1] text-softGold xs:pt-16 xs:text-5xl sm:text-6xl ${BebasNeue.className} sm:text-wrap md:text-7xl`}
        >
          {" "}
          Dubai&apos;s most legendary <br /> stag party packages
        </AnimatedHeading>
        <p className="text-xs xs:text-base">
          {packages.length} curated packages. One unforgettable weekend.
        </p>
      </div>
    </div>
  );
}
