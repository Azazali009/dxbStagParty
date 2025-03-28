import HomeHeroSection from "./_components/HomeHeroSection";
// import HomeStagPartyGrids from "./_components/HomeStagPartyGrids";
import Testimonilas from "./_components/Testimonials";
import HowItWorks from "./_components/HowItWorks";
import StagPartyPackages from "@/app/_components/StagPartyPackages";
import Activities from "@/app/_components/Activities";
// import Map from "@/app/_components/Map";

export default function Home() {
  return (
    <div className="flex flex-col justify-center space-y-6">
      <HomeHeroSection />
      {/* divider */}
      <div className="h-[0.06px] w-full bg-tertiary/40"></div>
      <div className="space-y-12 py-10 sm:py-20">
        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl md:text-5xl">
          Explore our activities
        </h2>
        <Activities />
      </div>
      <StagPartyPackages />
      {/* <div className="space-y-9 py-16">
        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-5xl font-bold text-transparent">
          What would you like to book?
        </h2>
        <ul className="mx-auto grid max-w-5xl grid-cols-4 gap-4">
          <li>
            <Link
              className="flex justify-center rounded-full border-2 border-secondary bg-transparent px-6 py-2 text-sm capitalize transition-all duration-300 hover:bg-secondary"
              href={"/activities"}
            >
              a ready made package
            </Link>
          </li>
          <li>
            <Link
              className="flex justify-center rounded-full border-2 border-secondary bg-transparent px-6 py-2 text-sm capitalize transition-all duration-300 hover:bg-secondary"
              href={"/activities"}
            >
              build your own package
            </Link>
          </li>
          <li>
            <Link
              className="flex justify-center rounded-full border-2 border-secondary bg-transparent px-6 py-2 text-sm capitalize transition-all duration-300 hover:bg-secondary"
              href={"/activities"}
            >
              just an activity
            </Link>
          </li>
          <li>
            <Link
              className="flex justify-center rounded-full border-2 border-secondary bg-transparent px-6 py-2 text-sm capitalize transition-all duration-300 hover:bg-secondary"
              href={"/activities"}
            >
              just accomodation
            </Link>
          </li>
        </ul>
        <HomeStagPartyGrids />
      </div> */}
      <HowItWorks />
      {/* <Map /> */}
      <Testimonilas />
    </div>
  );
}
