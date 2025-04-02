import HomeHeroSection from "./_components/HomeHeroSection";
// import HomeStagPartyGrids from "./_components/HomeStagPartyGrids";
import Testimonilas from "./_components/Testimonials";
import HowItWorks from "./_components/HowItWorks";
import HomePackages from "@/app/_components/HomePackages";
import Activities from "@/app/_components/Activities";
import { getPackages } from "./_lib/packagesApi";
// import Map from "@/app/_components/Map";

export default async function Home() {
  const packages = await getPackages();
  return (
    <div className="flex flex-col justify-center space-y-6">
      <HomeHeroSection />
      {/* divider */}
      {/* <div className="h-[0.06px] w-full bg-tertiary/40"></div> */}
      <div className="space-y-12 py-10 sm:py-20">
        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl md:text-5xl">
          Explore our activities
        </h2>
        <Activities />
      </div>

      <HomePackages packages={packages} />
      <HowItWorks />
      <Testimonilas />
    </div>
  );
}
