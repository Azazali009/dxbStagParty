import Link from "next/link";
import HomeHeroSection from "./_components/HomeHeroSection";
import HomeStagPartyGrids from "./_components/HomeStagPartyGrids";
import Testimonilas from "./_components/Testimonials";
import HowItWorks from "./_components/HowItWorks";

export default function Home() {
  return (
    <div className="flex flex-col justify-center space-y-6">
      <HomeHeroSection />
      {/* divider */}
      <div className="h-[0.06px] w-full bg-tertiary/40"></div>
      <div className="space-y-9 py-16">
        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-5xl font-bold text-transparent">
          What would you like to book?
        </h2>
        <ul className="mx-auto grid max-w-5xl grid-cols-4 gap-4">
          <li>
            <Link
              className="flex justify-center rounded-full border-2 border-tertiary bg-transparent px-6 py-2 text-sm capitalize transition-all duration-500 hover:bg-tertiary"
              href={"/activities"}
            >
              a ready made package
            </Link>
          </li>
          <li>
            <Link
              className="flex justify-center rounded-full border-2 border-tertiary bg-transparent px-6 py-2 text-sm capitalize transition-all duration-500 hover:bg-tertiary"
              href={"/activities"}
            >
              build your own package
            </Link>
          </li>
          <li>
            <Link
              className="flex justify-center rounded-full border-2 border-tertiary bg-transparent px-6 py-2 text-sm capitalize transition-all duration-500 hover:bg-tertiary"
              href={"/activities"}
            >
              just an activity
            </Link>
          </li>
          <li>
            <Link
              className="flex justify-center rounded-full border-2 border-tertiary bg-transparent px-6 py-2 text-sm capitalize transition-all duration-500 hover:bg-tertiary"
              href={"/activities"}
            >
              just accomodation
            </Link>
          </li>
        </ul>
        <HomeStagPartyGrids />
      </div>
      <HowItWorks />
      <Testimonilas />
    </div>
  );
}
